import { aiComplete, isAiConfigured } from "@/lib/api/ai";
import { getOrGenerate } from "@/lib/cache/remote";
import { nameFingerprint } from "@/lib/astro/fingerprint";

export async function nameCompatibility(nameA: string, nameB: string, lang: "tr" | "en" = "tr"): Promise<{ score: number; text: string }> {
  const fp = [nameFingerprint(nameA), nameFingerprint(nameB)].sort().join(":");
  const score = 40 + ((parseInt(fp.slice(0, 8), 36) || 0) % 60);

  if (!isAiConfigured()) {
    const mock = lang === "tr"
      ? `${nameA} ve ${nameB} — iki isim aynı mıknatısa değil ama aynı tele. ${nameA}'nin harfleri daha ateş, ${nameB}'nin ise daha su. Birlikteyken buhar olursunuz: bazen gözden kaybolan ama her zaman yükselen bir ikili. Uyumunuzun sırrı tek kelimede: sabır. İsimlerinizin titreşimi aynı zamanda aynı anahtarı çalmıyor, ama duetinizin kendine özgü bir güzelliği var.`
      : `${nameA} and ${nameB} — not quite the same magnet, but the same wire. ${nameA}'s letters lean fire, ${nameB}'s lean water. Together you make steam: sometimes invisible, always rising. Your secret word: patience. Your name vibrations don't strike the same key at the same moment, but the duet has its own unusual beauty.`;
    return { score, text: mock };
  }

  const key = `namecompat:${fp}`;
  const text = await getOrGenerate(key, lang, async () => {
    const prompt =
      lang === "tr"
        ? `${nameA} ve ${nameB} isimleri arasındaki uyumu numeroloji ve harflerin titreşimine göre eğlenceli + samimi anlatan 120 kelimelik yorum yaz. Skor verme, metin içinde ipucu bırak.`
        : `Write a 120-word fun-but-warm compatibility commentary between the names ${nameA} and ${nameB} based on numerology and letter vibrations. No numeric score, hint it in the text.`;
    return aiComplete(prompt, { maxTokens: 280 });
  });
  return { score, text };
}
