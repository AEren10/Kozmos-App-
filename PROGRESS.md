# Kozmos — Gelişim Günlüğü

Burası **ne yaptım, ne kaldı** defterimiz. Her commit / büyük değişiklik buraya eklenecek.

---

## 🎯 Ürün Özeti

**Kozmos** — kişiselleştirilmiş astroloji mobil uygulaması.
- Hedef: Co-Star / Chani tarzı global pazar + TR niche
- Platform: iOS + Android (web ikincil)
- Monetizasyon: Freemium + ₺99/ay abonelik + ₺79-149 tek seferlik raporlar
- Stack: Expo SDK 54 + React Native 0.81 + TypeScript + Redux Toolkit + Supabase + NativeWind

---

## ✅ Tamamlananlar (Phase 1-7)

### PHASE 1 — Fikir & Kapsam ✓
- Ürün: Astroloji bundle (günlük burç + doğum haritası + sinastri + numeroloji + geçmiş yaşam + isim uyumu)
- Platform: iOS + Android + web
- MVP v1: günlük burç, doğum haritası (Güneş), sinastri, numeroloji, isim uyumu, geçmiş yaşam, 4 adımlı onboarding
- Para modeli: freemium + aylık abonelik + one-shot PDF raporlar

### PHASE 2 — Proje Kurulumu ✓
- `npx create-expo-app kozmos-app --template blank-typescript` çalıştırıldı
- Klasör yapısı kuruldu: `app/ components/ hooks/ lib/ store/ types/ constants/ features/ supabase/`
- `tsconfig.json` → `strict: true`, path alias `@/*` eklendi
- `.gitignore` → node_modules, .env, .expo, ios/, android/ eklendi
- `.env.example` + `.env` stub dosyaları oluşturuldu (key'ler boş, kullanıcı dolduracak)
- Claude Code Templates yüklendi:
  - `development-team/mobile-app-developer` agent → `.claude/agents/`
  - `creative-design/mobile-design` skill → `.claude/skills/`

### PHASE 3 — Navigation ✓
- `expo-router`, `react-native-safe-area-context`, `react-native-screens` yüklendi
- `app/(auth)/` → login, register, onboarding
- `app/(tabs)/` → index (daily), natal, compat, tools, profile
- `app/_layout.tsx` → auth guard + redirect + Stack root
- `app/index.tsx` → auth+onboarding redirect

### PHASE 4 — Auth ✓
- Supabase seçildi (auth + db aynı yerde, maliyet sıfır)
- `@supabase/supabase-js` yüklendi, `lib/supabase.ts` oluşturuldu
- `expo-secure-store` yüklendi (token güvenli saklama için)
- `hooks/useAuth.ts` → `useAuthBootstrap`, `signInWithEmail`, `signUpWithEmail`, `signOut`
- Login + register ekranları yazıldı (email/şifre), form validasyon basic
- Onboarding 4 adım: isim → doğum tarihi → saat → yer
- Apple Sign-In: v2'de eklenecek (backlog)

### PHASE 5 — Veritabanı & API ✓
- Supabase migration: `supabase/migrations/0001_init.sql`
  - `profiles` (user profile + natal)
  - `interpretations` (universal cache)
  - `user_charts` (user natal cache)
  - `synastry_cache` (çift uyum cache)
  - `feedback` (engagement)
  - `push_tokens`
- RLS politikaları her tabloda açık
- `lib/api/` klasörü: `ai.ts` (gateway), `users.ts`, `horoscope.ts`, `synastry.ts`, `numerology.ts`, `nameCompat.ts`, `pastLife.ts`
- React Query: `QueryClientProvider` root'a eklendi, staleTime 60s
- Supabase Edge Function stub: `supabase/functions/ai-complete/index.ts` (Anthropic proxy)

### PHASE 6 — UI Sistemi ✓
- `constants/theme.ts` → renkler, spacing, radii, font size
- NativeWind v4 + Tailwind v3.4 kuruldu, `tailwind.config.js` + `global.css` + `metro.config.js` ayarlandı
- Base componentler: `Button`, `Input`, `Card`, `Screen`, `Heading` (H1/H2/H3/Body/Caption)
- Dark mode varsayılan (kozmos teması — koyu mor/indigo)

### PHASE 7 — State Management ✓
- **Redux Toolkit** seçildi (istek üzerine, Zustand değil)
- `store/` yapısı: `slices/authSlice.ts`, `profileSlice.ts`, `uiSlice.ts`
- `redux-persist` + AsyncStorage → auth + profile + ui otomatik persist
- `useAppDispatch`, `useAppSelector` typed hook'lar export edildi
- `PersistGate` root'ta hydration'ı bekliyor

### PHASE 8 — Astroloji Çekirdeği ✓
- `constants/zodiac.ts` → 12 burç tam veri (TR/EN isim, sembol, element, tarih aralığı)
- `lib/astro/sunSign.ts` → ISO tarihten Güneş burcu
- `lib/astro/fingerprint.ts` → birth/synastry/name fingerprint (cache key)
- `lib/astro/natal.ts` → client fallback + backend proxy sözleşmesi
- `lib/cache/local.ts` → AsyncStorage TTL cache
- `lib/cache/remote.ts` → Supabase interpretations cache + `getOrGenerate` pattern

### PHASE 8.5 — Ekranlar ✓
- Daily (index): Günlük burç + mood/aşk/kariyer/sağlık star bar + ipucu kartı
- Natal: Güneş/Ay/Yükselen kartları + "Tam Rapor PDF ₺149" CTA
- Compat: Partner formu + sinastri skor + bölüm kartları + "Tam Rapor ₺79"
- Tools: Keşfet ekranı — Numeroloji, İsim Uyumu, Geçmiş Yaşam aktif; Tarot/Rüya/Kahve "Yakında"
- Profile: Profil kartı + Plus upsell + çıkış
- Report modal: `/report/[id]` dinamik — numerology/nameCompat/pastLife

---

## 🟡 Kısmen Tamam / Backend Kalan

### Supabase Setup (kullanıcı manuel yapacak)
- Supabase projesi oluştur → url + anon key'i `.env` dosyasına yaz
- Dashboard'dan `supabase/migrations/0001_init.sql` çalıştır (SQL Editor)
- Edge Function deploy:
  ```bash
  supabase functions deploy ai-complete
  supabase secrets set ANTHROPIC_API_KEY=sk-ant-xxx
  ```
- `.env` → `EXPO_PUBLIC_API_BASE_URL=https://<project>.functions.supabase.co`

### Natal Chart Backend (v1.1)
- Şu an client sadece Güneş hesaplıyor. Ay/Yükselen/gezegenler için:
  - Ayrı edge function: `supabase/functions/natal/index.ts` (henüz yazılmadı)
  - `sweph` NPM / `swisseph-wasm` Deno için — araştır
  - Endpoint sözleşmesi: `lib/astro/natal.ts` içinde yazılı

### Universal Interpretation Pre-Generation (v1.1)
- Launch öncesi 300 blok (12 burç × 10 gezegen × ev) pre-generate edilmeli
- Script: `scripts/seed-interpretations.ts` (henüz yazılmadı)
- Tek seferlik çalışır, DB'ye `interpretations` tablosuna yazar

---

## 🔴 Henüz Yapılmadı (Phase 8-12)

### PHASE 8 — Push Notification
- `expo-notifications`, `expo-device` yüklü ✓ (config-plugin da eklendi)
- `hooks/usePushToken.ts` yazılacak → token al → Supabase `push_tokens`'a kaydet
- Backend cron: günlük burç push (Supabase pg_cron + Edge Function)

### PHASE 9 — Monetizasyon (RevenueCat)
- `react-native-purchases` yüklenecek: `npx expo install react-native-purchases`
- RevenueCat dashboard: "kozmos_plus" entitlement, ₺99/ay + ₺899/yıl paketleri
- `app/paywall.tsx` ekranı
- `profile.is_premium` kolonu purchase callback ile güncellenir (Edge Function webhook)
- Restore purchases butonu (iOS zorunlu)

### PHASE 10 — Analytics & Crash
- Sentry: `npx expo install @sentry/react-native` + DSN env
- PostHog: screen tracking middleware `app/_layout.tsx`'e

### PHASE 11 — Test
- `jest-expo` + `@testing-library/react-native`
- Store logic unit test (`authSlice`, `profileSlice`)
- Utility test: `sunSign.ts`, `fingerprint.ts`, `numerology.ts`
- E2E: Maestro flow — signup → onboarding → daily horoscope

### PHASE 12 — Deploy
- `eas-cli` global yükle → `eas login` → `eas build:configure`
- `app.json`: bundleIdentifier `com.kozmos.app` ✓, buildNumber 1 ✓
- `eas build --platform ios --profile preview` → TestFlight
- Store görselleri: icon 1024, screenshot'lar, feature graphic (tasarım kalan)
- `eas update` (OTA) — launch sonrası

---

## 🚀 Hızlı Başlangıç

```bash
cd /c/Users/A.Eren/kozmos-app

# 1. .env dosyasını doldur:
#    EXPO_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
#    EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
#    EXPO_PUBLIC_API_BASE_URL=https://xxx.functions.supabase.co

# 2. Supabase'de migration çalıştır (Dashboard > SQL Editor > 0001_init.sql)

# 3. Çalıştır:
npm start
# veya
npm run ios / npm run android / npm run web
```

---

## 📦 Proje Yapısı

```
kozmos-app/
├── app/
│   ├── _layout.tsx              # Root: Redux + Query + Auth Guard
│   ├── index.tsx                # Splash router
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── onboarding.tsx       # 4-adım doğum verisi
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab bar
│   │   ├── index.tsx            # Günlük burç (default tab)
│   │   ├── natal.tsx            # Doğum haritası
│   │   ├── compat.tsx           # Sinastri / uyum
│   │   ├── tools.tsx            # Keşfet — tüm araçlar
│   │   └── profile.tsx          # Profil + abonelik
│   └── report/
│       └── [id].tsx             # Numeroloji / geçmiş yaşam / isim uyumu modal
├── components/
│   └── ui/                      # Button, Input, Card, Screen, Heading
├── constants/
│   ├── theme.ts                 # Renkler, spacing, radii, fontSizes
│   └── zodiac.ts                # 12 burç tam veri
├── hooks/
│   └── useAuth.ts               # bootstrap + signIn/Up/Out
├── lib/
│   ├── supabase.ts              # Supabase client
│   ├── api/
│   │   ├── ai.ts                # AI gateway (backend proxy)
│   │   ├── users.ts             # Profile CRUD
│   │   ├── horoscope.ts         # Günlük burç + cache
│   │   ├── synastry.ts          # Çift uyumu + cache
│   │   ├── numerology.ts        # Numeroloji (client-side math)
│   │   ├── nameCompat.ts        # İsim uyumu
│   │   └── pastLife.ts          # Geçmiş yaşam (AI + cache)
│   ├── astro/
│   │   ├── sunSign.ts           # Tarihten burç
│   │   ├── fingerprint.ts       # Cache key üretici
│   │   └── natal.ts             # Doğum haritası (backend proxy)
│   └── cache/
│       ├── local.ts             # AsyncStorage TTL cache
│       └── remote.ts            # Supabase interpretations cache
├── store/                       # Redux Toolkit + redux-persist
│   ├── index.ts
│   └── slices/ (auth, profile, ui)
├── supabase/
│   ├── migrations/0001_init.sql
│   └── functions/ai-complete/   # Edge function stub
├── types/index.ts
├── .env.example
├── .env                         # LOCAL — gitignored
├── app.json                     # bundleId com.kozmos.app
├── tailwind.config.js
├── metro.config.js
├── babel.config.js
├── global.css
├── tsconfig.json
└── package.json
```

---

## 💰 Maliyet Modeli (özet)

| Kalem | Aylık |
|---|---|
| Domain | $0.83 (yıllık $10) |
| Supabase Free | $0 (500MB + 50K MAU) |
| Vercel / Expo | $0 |
| Claude API (cache'li, 10K user) | $10-30 |
| RevenueCat | $0 (ilk $10K/ay gelirine kadar) |
| **Toplam** | **~$10-30/ay** |

---

## 🔑 Önemli Kurallar

1. **Her AI çağrısı cache'den geçer.** Cache miss → generate → hem user'a hem cache'e yaz.
2. **Kullanıcı verilerinden öğren.** Her yorum altında 👍/👎 → `feedback` tablosu → v2'de prompt kondisyonu.
3. **Text-only.** Görsel üretme — pahalı. Sabit illüstrasyon + dinamik metin.
4. **Claude Haiku** varsayılan (Sonnet yerine — 4x ucuz, kalite yeter).
5. **API key'ler client'ta YOK.** Anthropic anahtarı sadece Edge Function'da.
6. **Eğlence amacı disclaimer** her ekranın altında.

---

## 🔌 Supabase Entegrasyonu

- **Proje URL:** `https://doesvekonokhlufofeep.supabase.co`
- **Publishable key:** `.env` içinde (`EXPO_PUBLIC_SUPABASE_KEY`)
- `lib/supabase.ts` → hem `EXPO_PUBLIC_SUPABASE_KEY` hem `EXPO_PUBLIC_SUPABASE_ANON_KEY` desteği
- Supabase agent skills yüklendi: `.agents/skills/supabase` + `.agents/skills/supabase-postgres-best-practices`
- Supabase MCP: `/mcp` komutuyla OAuth bekleniyor → yetkilendirilince migration otomatik çalışacak

## ✨ v1.5 — UX & Growth Güncellemesi (2026-04-22)

### Eklenen özellikler
- ✅ **i18next** TR/EN lokalizasyon — tüm UI stringler çevrildi
- ✅ **Onboarding intro** — 4 slaytlı swipe ekran, background video + gradient overlay (expo-video)
- ✅ **Native DatePicker** — `@react-native-community/datetimepicker`, iOS inline + Android native
- ✅ **Şehir autocomplete** — OpenStreetMap Nominatim (free API), lat/lon otomatik
- ✅ **Paywall ekranı** — Haftalık / Yıllık planlar, %62 indirim badge'i, 6 feature listesi, restore purchases
- ✅ **Settings ekranı** — Dil/Tema/Bildirim toggle, abonelik yönetimi, onboarding reset, çıkış
- ✅ **Toast sistemi** — `Alert.alert` kaldırıldı, animated top-toast (3 tip: info/success/error)
- ✅ **Streak sistemi** — Günlük ziyaret → 🔥 sayaç, Redux slice + persist
- ✅ **Share butonu** — Günlük burç + partner davet linki (expo-linking deep link)
- ✅ **FeedbackBar** — 👍/👎 `feedback` tablosuna kayıt, prompt öğrenme için
- ✅ **react-native-purchases** yüklendi (RevenueCat, key bekleyen)
- ✅ **Reanimated 4 + worklets** uyumu düzeltildi

### Akış (yeni)
```
Register → onboarding-intro (video swipe) → birth (4-step date picker + geocode) → paywall (modal) → tabs
```

### Yeni dosyalar
```
app/
├── onboarding-intro.tsx     # Video swipe intro
├── paywall.tsx              # Freemium modal
└── (tabs)/settings.tsx      # Ayarlar (profile yerine)

lib/
├── i18n.ts                  # TR/EN init
├── geocode.ts               # Nominatim wrapper
└── share.ts                 # Share + invite link

locales/
├── tr.json
└── en.json

components/
├── ui/Toast.tsx
├── ui/FeedbackBar.tsx
├── forms/DateField.tsx
└── forms/CityAutocomplete.tsx

store/slices/streakSlice.ts  # streak + onboardingSeen + paywallSeen
```

### Agent/Skill paketleri yüklü
- `.claude/agents/mobile-app-developer.md`
- `.claude/skills/mobile-design/`
- `.agents/skills/supabase/`
- `.agents/skills/supabase-postgres-best-practices/`
- `.agents/skills/zafer-skills/` (onboarding + paywall + settings şablonları buradan geldi)

### Hâlâ yapılacaklar
- [ ] RevenueCat API key + real purchase flow
- [ ] Push notification token register + günlük cron
- [ ] Light theme implementasyonu (şu an sadece dark)
- [ ] PDF rapor üretimi (`@react-pdf/renderer`)
- [ ] Sentry + PostHog setup
- [ ] Anthropic API key → Edge Function secret set

_Son güncelleme: 2026-04-22 — UX/Growth özellikleri eklendi._
