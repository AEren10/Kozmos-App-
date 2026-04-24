import { aiComplete, isAiConfigured } from "@/lib/api/ai";
import { mockDaily } from "@/lib/api/mock";
import { cacheGet, cacheSet } from "@/lib/cache/local";
import { getOrGenerate } from "@/lib/cache/remote";
import { fetchBlocks, keysForNatal, composeContext } from "@/lib/astro/blocks";
import type { ZodiacSign } from "@/constants/zodiac";
import { ZODIAC } from "@/constants/zodiac";
import type { DailyHoroscope } from "@/types";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Günlük burç — 2 aşamalı composition:
 *   1. Kullanıcının sun/moon/rising blokları DB'den çekilir (cached, üretilmez)
 *   2. LLM bu bağlamla bugünün küçük mesajını yazar (80-120 kelime)
 *
 * Fallback: Blok yoksa eski "sıfırdan" yaklaşımı kullanır.
 */
export async function getDailyHoroscope(
  sign: ZodiacSign,
  date: string,
  lang: "tr" | "en" = "tr",
  natal?: { moon: ZodiacSign | null; rising: ZodiacSign | null },
): Promise<DailyHoroscope> {
  const localKey = `daily:${lang}:${sign}:${date}`;
  const hit = await cacheGet<DailyHoroscope>(localKey);
  if (hit) return hit;

  if (!isAiConfigured()) {
    const result: DailyHoroscope = {
      sign,
      date,
      content: mockDaily(sign, date, lang),
      mood: 4,
      love: 3,
      career: 4,
      health: 3,
    };
    await cacheSet(localKey, result, DAY_MS);
    return result;
  }

  const remoteKey = `daily:${date}:${sign}${natal?.moon ? ":" + natal.moon : ""}${natal?.rising ? ":" + natal.rising : ""}`;

  const content = await getOrGenerate(remoteKey, lang, async () => {
    const blocks = await fetchBlocks(
      keysForNatal({ sun: sign, moon: natal?.moon ?? null, rising: natal?.rising ?? null }, lang),
      lang,
    );
    const hasBlocks = Object.keys(blocks).length > 0;

    if (hasBlocks) {
      const context = composeContext({ sun: sign, moon: natal?.moon ?? null, rising: natal?.rising ?? null }, lang, blocks);
      const prompt =
        lang === "tr"
          ? `Aşağıdaki kişinin astroloji profilini oku:\n\n${context}\n\nBu profile özel ${date} tarihli 100-120 kelimelik günlük yorumu yaz. Aşk, iş, ruh hali ve bir mikro uyarı içsin. Klişelerden kaçın, bugüne özgü hisset. Sadece yorumu yaz, başka açıklama ekleme.`
          : `Read this person's astrology profile:\n\n${context}\n\nWrite a 100-120 word daily reading for ${date} specific to this profile. Include love, work, mood and one micro-warning. Avoid cliches, feel today-specific. Only the reading, no preamble.`;
      return aiComplete(prompt, { maxTokens: 300 });
    }

    const z = ZODIAC[sign];
    const prompt =
      lang === "tr"
        ? `${date} tarihi için ${z.nameTr} burcuna özel 150 kelimelik günlük burç yorumu yaz. Aşk, iş, ruh hali ve önemli bir uyarı içersin.`
        : `Write a 150-word personalized daily horoscope for ${z.name} for ${date}. Include love, career, mood, and one key warning.`;
    return aiComplete(prompt, { maxTokens: 400 });
  });

  const h = (s: string) => {
    let x = 0;
    for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(x);
  };
  const seed = h(remoteKey);
  const result: DailyHoroscope = {
    sign,
    date,
    content,
    mood: 3 + (seed % 3),
    love: 3 + ((seed >> 3) % 3),
    career: 3 + ((seed >> 6) % 3),
    health: 3 + ((seed >> 9) % 3),
  };
  await cacheSet(localKey, result, DAY_MS);
  return result;
}
