#!/usr/bin/env node
/**
 * Seed / refresh universal interpretation blocks.
 *
 * Kullanım:
 *   export SUPABASE_URL=...
 *   export SUPABASE_SERVICE_ROLE_KEY=...   # service role gerek, anon değil
 *   export ANTHROPIC_API_KEY=...
 *   node scripts/seed-blocks.mjs [--force] [--only tr]
 *
 * --force   : mevcut blokları da yeniden üretir (needs_regenerate olmasa bile)
 * --only X  : sadece bu dili üret (tr|en)
 *
 * Mantık:
 *   1. Signs × (sun|moon|rising) = 36 blok × lang = 72 blok
 *   2. Her biri için DB'ye bakar → yoksa ya da needs_regenerate ise üretir
 *   3. Claude Haiku çağrılır, pennies harcar (~$0.30 tüm setler için)
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

if (!SUPABASE_URL || !SERVICE_KEY || !ANTHROPIC_KEY) {
  console.error("Env eksik. Gerekli: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY");
  process.exit(1);
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyLangIdx = args.indexOf("--only");
const onlyLang = onlyLangIdx > -1 ? args[onlyLangIdx + 1] : null;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const SIGNS = [
  { key: "aries", tr: "Koç", en: "Aries" },
  { key: "taurus", tr: "Boğa", en: "Taurus" },
  { key: "gemini", tr: "İkizler", en: "Gemini" },
  { key: "cancer", tr: "Yengeç", en: "Cancer" },
  { key: "leo", tr: "Aslan", en: "Leo" },
  { key: "virgo", tr: "Başak", en: "Virgo" },
  { key: "libra", tr: "Terazi", en: "Libra" },
  { key: "scorpio", tr: "Akrep", en: "Scorpio" },
  { key: "sagittarius", tr: "Yay", en: "Sagittarius" },
  { key: "capricorn", tr: "Oğlak", en: "Capricorn" },
  { key: "aquarius", tr: "Kova", en: "Aquarius" },
  { key: "pisces", tr: "Balık", en: "Pisces" },
];

const CATEGORIES = [
  {
    key: "sun",
    tr: (sign) => `Güneş ${sign} burcunda olmanın özü nedir? 80-100 kelimede, samimi ama derin, bu kişinin hayat teması/egosu/kendini ifade etme şekli hakkında yaz. Klişelerden kaçın, sıradan burç sitesi gibi olmasın. İkinci tekil şahısla yaz.`,
    en: (sign) => `What is the essence of Sun in ${sign}? In 80-100 words, warm but deep, write about this person's life theme/ego/self-expression. Avoid cliches, don't sound like a generic horoscope site. Use second person.`,
  },
  {
    key: "moon",
    tr: (sign) => `Ay ${sign} burcunda olmanın duygusal dünyası nedir? 80-100 kelimede bu kişinin iç dünyası, güvenlik hissi, nasıl rahatladığı hakkında yaz. İkinci tekil şahısla.`,
    en: (sign) => `What is the emotional world of Moon in ${sign}? In 80-100 words, describe this person's inner life, sense of safety, how they self-soothe. Second person.`,
  },
  {
    key: "rising",
    tr: (sign) => `Yükselen ${sign} burcunun dış maske ve ilk izlenim üzerindeki etkisi nedir? 80-100 kelimede bu kişinin diğerlerine nasıl göründüğü, ilk etkileşim tarzı hakkında yaz. İkinci tekil şahısla.`,
    en: (sign) => `What does a ${sign} Rising mean for outward persona and first impressions? 80-100 words on how this person appears to others and their first-interaction style. Second person.`,
  },
];

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.content?.[0]?.text?.trim() ?? "";
}

async function needsGen(key, lang) {
  if (force) return true;
  const { data } = await supabase
    .from("interpretations")
    .select("key, needs_regenerate")
    .eq("key", key)
    .eq("lang", lang)
    .maybeSingle();
  if (!data) return true;
  return !!data.needs_regenerate;
}

async function upsertBlock(key, lang, content) {
  await supabase.from("interpretations").upsert({
    key,
    lang,
    content,
    version: 1,
    needs_regenerate: false,
    negative_votes: 0,
    updated_at: new Date().toISOString(),
  });
}

async function main() {
  const langs = onlyLang ? [onlyLang] : ["tr", "en"];
  let generated = 0;
  let skipped = 0;

  for (const lang of langs) {
    for (const cat of CATEGORIES) {
      for (const sign of SIGNS) {
        const key = `${cat.key}_${sign.key}_${lang}`;
        if (!(await needsGen(key, lang))) {
          skipped++;
          continue;
        }
        const displayName = sign[lang];
        const prompt = cat[lang](displayName);
        process.stdout.write(`→ ${key} ... `);
        try {
          const content = await callClaude(prompt);
          await upsertBlock(key, lang, content);
          generated++;
          console.log("✓");
        } catch (e) {
          console.log("✗", e.message);
        }
      }
    }
  }

  console.log(`\nBitti. ${generated} üretildi, ${skipped} atlandı.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
