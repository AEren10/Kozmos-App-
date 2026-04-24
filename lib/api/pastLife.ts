import { aiComplete, isAiConfigured } from "@/lib/api/ai";
import { mockPastLife } from "@/lib/api/mock";
import { getOrGenerate } from "@/lib/cache/remote";
import { birthFingerprint } from "@/lib/astro/fingerprint";
import { sunSignFromISO } from "@/lib/astro/sunSign";
import { ZODIAC } from "@/constants/zodiac";
import type { BirthData } from "@/types";

export async function pastLifeReading(b: BirthData, lang: "tr" | "en" = "tr"): Promise<string> {
  if (!isAiConfigured()) return mockPastLife(b.birth_date, lang);
  const fp = birthFingerprint(b);
  const key = `pastlife:${fp}`;
  const sign = sunSignFromISO(b.birth_date);
  return getOrGenerate(key, lang, async () => {
    const prompt =
      lang === "tr"
        ? `${ZODIAC[sign].nameTr} burcuna sahip, ${b.birth_date} doğumlu kullanıcı için geçmiş yaşam analizi yaz. Güney Ay Düğümü temasıyla geçmiş yaşamda kim olduğu, hangi dersleri bu hayata taşıdığı, şimdi nereye evrimleştiğini üç paragrafta, dokunaklı bir dille anlat. Dini içerik yok, eğlence/içsel yolculuk tonu.`
        : `Write a past-life reading for a user born ${b.birth_date} with sun in ${ZODIAC[sign].name}. Focus on South Node themes: who they were, lessons carried into this life, where they're evolving now. Three short paragraphs, evocative tone.`;
    return aiComplete(prompt, { maxTokens: 600 });
  });
}
