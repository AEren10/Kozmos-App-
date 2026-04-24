import { z } from "zod";
import { aiComplete, isAiConfigured } from "@/lib/api/ai";
import { mockSynastry } from "@/lib/api/mock";
import { getOrGenerate } from "@/lib/cache/remote";
import { synastryFingerprint } from "@/lib/astro/fingerprint";
import { sunSignFromISO } from "@/lib/astro/sunSign";
import { ZODIAC } from "@/constants/zodiac";
import type { BirthData, SynastryResult } from "@/types";

const SynastrySchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string().min(4),
  sections: z
    .array(z.object({ title: z.string().min(1), body: z.string().min(1) }))
    .min(3)
    .max(5),
});
type SynastryPayload = z.infer<typeof SynastrySchema>;

function fpSeed(fp: string): number {
  let h = 0;
  for (let i = 0; i < fp.length; i++) h = ((h << 5) - h + fp.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function tryParseJson(raw: string): SynastryPayload | null {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[0]) as unknown;
    const r = SynastrySchema.safeParse(parsed);
    return r.success ? r.data : null;
  } catch {
    return null;
  }
}

function parseSectionsFallback(text: string): { title: string; body: string }[] {
  const blocks = text
    .split(/\n(?=\d\)|\d\.)/)
    .map((b) => b.trim())
    .filter(Boolean);
  return blocks.map((b) => {
    const [first, ...rest] = b.split("\n");
    return {
      title: first.replace(/^\d[\).\s]+/, "").slice(0, 60),
      body: rest.join("\n").trim() || first,
    };
  });
}

export async function computeSynastry(
  a: BirthData,
  b: BirthData,
  lang: "tr" | "en" = "tr",
): Promise<SynastryResult> {
  const fp = synastryFingerprint(a, b);
  const key = `synastry:${fp}`;

  const signA = sunSignFromISO(a.birth_date);
  const signB = sunSignFromISO(b.birth_date);

  if (!isAiConfigured()) {
    const content = mockSynastry(a.name ?? "Sen", b.name ?? "Partner", lang);
    const score = 60 + (fpSeed(fp) % 35);
    return {
      fingerprint: fp,
      score,
      summary: content.split("\n")[0],
      sections: parseSectionsFallback(content),
    };
  }

  const raw = await getOrGenerate(key, lang, async () => {
    const nameA = a.name ?? (lang === "tr" ? "Kişi 1" : "Person 1");
    const nameB = b.name ?? (lang === "tr" ? "Kişi 2" : "Person 2");
    const signAName = lang === "tr" ? ZODIAC[signA].nameTr : ZODIAC[signA].name;
    const signBName = lang === "tr" ? ZODIAC[signB].nameTr : ZODIAC[signB].name;

    const prompt =
      lang === "tr"
        ? `${signAName} (${nameA}) ile ${signBName} (${nameB}) arasındaki sinastri analizini yaz.
YALNIZCA aşağıdaki JSON şemasında dön, başka metin ekleme, Markdown kod bloğu kullanma:
{
  "score": <0-100 arası tam sayı>,
  "summary": "<tek cümle genel özet>",
  "sections": [
    { "title": "Aşk ve Duygusal Bağ", "body": "<80 kelime>" },
    { "title": "İletişim ve Zihinsel Uyum", "body": "<80 kelime>" },
    { "title": "Zorlu Bölge ve Tavsiye", "body": "<80 kelime>" }
  ]
}
Samimi, gerçekçi, klişesiz yaz.`
        : `Write a synastry analysis between ${signAName} (${nameA}) and ${signBName} (${nameB}).
Return ONLY JSON in this exact schema, no extra text, no markdown fences:
{
  "score": <integer 0-100>,
  "summary": "<one-line overall summary>",
  "sections": [
    { "title": "Love and Emotional Bond", "body": "<80 words>" },
    { "title": "Communication and Mental Fit", "body": "<80 words>" },
    { "title": "Challenge and Advice", "body": "<80 words>" }
  ]
}
Warm, realistic, no cliches.`;
    return aiComplete(prompt, { maxTokens: 900 });
  });

  const parsed = tryParseJson(raw);
  if (parsed) {
    return {
      fingerprint: fp,
      score: Math.round(parsed.score),
      summary: parsed.summary,
      sections: parsed.sections,
    };
  }

  const score = 50 + (fpSeed(fp) % 50);
  const sections = parseSectionsFallback(raw);
  return {
    fingerprint: fp,
    score,
    summary: sections[0]?.body ?? raw.slice(0, 140),
    sections,
  };
}
