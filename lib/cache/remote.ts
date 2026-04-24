import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Interpretation } from "@/types";

/**
 * Remote cache: interpretation blokları. Universal (tüm kullanıcı) + user-specific.
 * Key örneği: "tr:sun:aries", "tr:natal:<fingerprint>", "tr:synastry:<pair_hash>"
 *
 * TTL: `interpretations.expires_at` (migration 0007) geçmiş satırlar cache miss sayılır.
 */
export async function getInterpretation(
  key: string,
  lang: "tr" | "en" = "tr",
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  const nowIso = new Date().toISOString();
  const { data } = await supabase
    .from("interpretations")
    .select("content, expires_at")
    .eq("key", key)
    .eq("lang", lang)
    .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
    .maybeSingle();
  return (data as { content?: string } | null)?.content ?? null;
}

function ttlFor(key: string): string | null {
  const now = Date.now();
  if (key.startsWith("daily:")) return new Date(now + 24 * 60 * 60 * 1000).toISOString();
  if (key.startsWith("synastry:") || key.startsWith("natal:"))
    return new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
  return null;
}

export async function setInterpretation(entry: Interpretation): Promise<void> {
  if (!isSupabaseConfigured()) return;
  await supabase.from("interpretations").upsert({
    ...entry,
    version: entry.version ?? 1,
    expires_at: ttlFor(entry.key),
  });
}

export async function getOrGenerate(
  key: string,
  lang: "tr" | "en",
  generator: () => Promise<string>,
): Promise<string> {
  const hit = await getInterpretation(key, lang);
  if (hit) return hit;
  const fresh = await generator();
  await setInterpretation({ key, content: fresh, lang, version: 1 });
  return fresh;
}
