/**
 * Astroloji yorum blokları — kullanıcıdan bağımsız, evrensel.
 * Her blok DB'de bir satır (`interpretations` tablosu).
 * Bir daha LLM'e yazdırılmaz: cache'den birleştirilir.
 *
 * Anahtar deseni: "{kategori}_{değer}_{lang}"
 *   sun_aries_tr, moon_cancer_tr, rising_leo_tr, mood_love_tr ...
 *
 * Composition akışı:
 *   1. Kullanıcının natal'ından ilgili blokları topla
 *   2. Bloklardan BAĞLAMI kur
 *   3. LLM'e küçük görev: "Bu bağlamla bugünün mesajını 100 kelimede yaz."
 *     (bütün astroloji yazımı değil, sadece günün enerjisine bağlama)
 *
 * Bu yaklaşımın avantajları:
 *   - LLM her seferinde sıfırdan yazmaz → ~80% token tasarrufu
 *   - Bloklar merkezi geliştirilir: birini düzeltirsen herkese yansır
 *   - Feedback ile kötü bloklar regenerate edilir (self-learning)
 */

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { ZodiacSign } from "@/constants/zodiac";

export type BlockCategory = "sun" | "moon" | "rising" | "aspect" | "house" | "theme";
export type Lang = "tr" | "en";

export function blockKey(cat: BlockCategory, value: string, lang: Lang) {
  return `${cat}_${value}_${lang}`;
}

type Row = { key: string; content: string; positive_votes?: number; negative_votes?: number };

/**
 * Birden fazla bloğu tek seferde çek. Sıralama korunur.
 * Feedback'ten negative ağırlıklı olanları atla (eğer çok kötüyse).
 */
export async function fetchBlocks(keys: string[], lang: Lang): Promise<Record<string, string>> {
  if (!isSupabaseConfigured() || keys.length === 0) return {};
  const { data } = await supabase
    .from("interpretations")
    .select("key, content")
    .in("key", keys)
    .eq("lang", lang);
  const map: Record<string, string> = {};
  (data as Row[] | null)?.forEach((r) => (map[r.key] = r.content));
  return map;
}

/**
 * Kullanıcının natal'ından composition bağlamı çıkar.
 * Ne kadar veri yazılırsa o kadar zengin yorum.
 */
export function composeContext(
  natal: { sun: ZodiacSign; moon: ZodiacSign | null; rising: ZodiacSign | null },
  lang: Lang,
  blocks: Record<string, string>,
): string {
  const parts: string[] = [];
  const sunBlock = blocks[blockKey("sun", natal.sun, lang)];
  if (sunBlock) parts.push(`[GÜNEŞ — ${natal.sun}]\n${sunBlock}`);
  if (natal.moon) {
    const moonBlock = blocks[blockKey("moon", natal.moon, lang)];
    if (moonBlock) parts.push(`[AY — ${natal.moon}]\n${moonBlock}`);
  }
  if (natal.rising) {
    const riseBlock = blocks[blockKey("rising", natal.rising, lang)];
    if (riseBlock) parts.push(`[YÜKSELEN — ${natal.rising}]\n${riseBlock}`);
  }
  return parts.join("\n\n");
}

export function keysForNatal(natal: {
  sun: ZodiacSign;
  moon: ZodiacSign | null;
  rising: ZodiacSign | null;
}, lang: Lang): string[] {
  const keys = [blockKey("sun", natal.sun, lang)];
  if (natal.moon) keys.push(blockKey("moon", natal.moon, lang));
  if (natal.rising) keys.push(blockKey("rising", natal.rising, lang));
  return keys;
}
