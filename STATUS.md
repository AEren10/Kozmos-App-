# Kozmos — Canlıya Çıkış Durumu

> Son güncelleme: 2026-04-24
> Hedef: App Store + Play Store yayını (prod-grade).

## ✅ Tamamlanan

### Güvenlik & Veri Bütünlüğü (kritik)
- **SecureStore adapter** — Supabase session artık Keychain/Keystore'da (web'de AsyncStorage fallback, chunking destekli). `lib/storage/secureStorage.ts`, `lib/supabase.ts`
- **Edge Function hardening (`ai-complete`)** — `verify_jwt=true`, user doğrulama, model whitelist, `max_tokens` cap 4096, per-user rate limit (10/dk · 100/gün · 500k token/gün → 429), generic error yanıtı, CORS preflight. `supabase/functions/ai-complete/index.ts`, `supabase/config.toml`, migration `0005_ai_usage.sql`
- **`ai.ts` user JWT** — anon key yerine `session.access_token`, `apikey` header ayrı. `lib/api/ai.ts`
- **RLS / upsert error propagation** — sessiz `try/catch{}` kaldırıldı, kullanıcıya toast. `lib/api/users.ts`, `app/(auth)/birth.tsx`, `locales/*`
- **Redux persist whitelist** — auth slice'tan `isAuthenticated` persist dışı, Supabase session tek kaynak. `store/index.ts`
- **Demo user migration** — prod migration'dan çıkarıldı, `supabase/seeds/demo_user.sql`'e taşındı

### Mimari & Cache
- **Feedback trigger fix** — key prefix match + updated_at bump. `supabase/migrations/0006_feedback_fix.sql`
- **SHA-256 fingerprint** — DJB2 → `js-sha256`, base64url 32 char. `lib/astro/fingerprint.ts`
- **AuthGate race fix** — double redirect kaldırıldı, `profileSynced` gating. `app/_layout.tsx`, `app/index.tsx`, `hooks/useAuth.ts`, `store/slices/profileSlice.ts`
- **Remote cache TTL** — `interpretations.expires_at` + index + before-insert trigger; daily 24h, synastry/natal 30g, diğerleri kalıcı. `supabase/migrations/0007_interpretations_ttl.sql`, `lib/cache/remote.ts`
- **Synastry JSON output** — LLM yanıtı Zod schema ile doğrulanıyor, fallback regex. `lib/api/synastry.ts`

### Tasarım (Nebula) — Pixel-accurate RN implementasyonu
- **Design tokens** — theme-nebula'dan çıkarıldı: palette, gradients, fonts, typography, spacing, radii, shadows (iOS + Android elevation), durations, easings. `constants/designTokens.ts`
- **Primitives & Nebula components** — Reanimated 3 worklet tabanlı: `GlowHalo`, `ShimmerText` (MaskedView + LinearGradient sweep), `GradientText`, `FadeUp`, `Starfield`, `Orb`, `OrbitRings`, `OrbitingDot`, `TypingDots`. UI: `Chip`, `Badge`, `Divider`, `SectionHeader`, `Screen`, `Card`, `Button`
- **Custom NebulaTabBar** — spring pill indicator + aktif tab glow halo
- **Ekran rewrite'ları** (Reanimated 3'e taşındı, legacy `Animated` elimine edildi):
  - `app/onboarding-intro.tsx`
  - `app/reveal.tsx`
  - `app/(auth)/login.tsx`, `register.tsx`
  - `app/(tabs)/index.tsx` (home)
  - `app/(tabs)/compat.tsx`
  - `app/(tabs)/natal.tsx`
  - `app/(tabs)/settings.tsx`
  - `app/paywall.tsx`
- **Font yükleme** — Fraunces / Inter / JetBrainsMono via `@expo-google-fonts/*`, splash gate

### Store Compliance (reject riski giderildi)
- `app.json`:
  - `ios.config.usesNonExemptEncryption: false`
  - `NSCameraUsageDescription`, `expo-image-picker.cameraPermission`
  - `PrivacyInfo.xcprivacy` (iOS 17 zorunlu) — UserDefaults CA92.1, FileTimestamp C617.1, SystemBootTime 35F9.1, DiskSpace E174.1
  - `usesAppleSignIn: true`
  - Android `permissions: ["INTERNET"]` whitelist
- **Hesap Silme** (Apple 5.1.1(v) + Play Console zorunlu):
  - Settings'te destructive buton + onay Alert
  - `supabase/functions/delete-account/index.ts` (JWT doğrulama → admin delete)
  - `supabase/migrations/0008_delete_account.sql` (FK cascade)
- **Paywall compliance** (Apple 3.1.2):
  - Restore Purchases butonu (stub)
  - Auto-renew disclaimer (mono caption, i18n)
  - Terms + Privacy Policy linkleri
  - Fiyat/süre açık: Yıllık ₺349 (₺29/ay efektif) / Aylık ₺59
- **Apple Sign-In** bağlandı (`expo-apple-authentication` + `supabase.auth.signInWithIdToken`)
- **Google Sign-In** — "Yakında" badge + disabled (credentials hazır olunca açılır)

---

## 🟡 Yapılması Gerekenler (launch-blocker)

### Kullanıcı tarafı (manuel)
- [ ] **Paket kurulumu**:
  ```
  npx expo install expo-application expo-apple-authentication @react-native-masked-view/masked-view
  ```
- [ ] **Privacy Policy + Terms URL'leri** (Vercel/Notion/Carrd): `settings.tsx` ve `paywall.tsx`'teki `https://kozmos.app/privacy|terms` placeholder'larını değiştir
- [ ] **Supabase deploy**:
  - Migration'lar: `0005_ai_usage.sql`, `0006_feedback_fix.sql`, `0007_interpretations_ttl.sql`, `0008_delete_account.sql`
  - Functions: `supabase functions deploy ai-complete delete-account`
  - Secrets: `supabase secrets set ANTHROPIC_API_KEY=...`
- [ ] **`.env` doldur**: Supabase URL + anon key, `EXPO_PUBLIC_AI_ENABLED=true` (prod build için şart — aksi hâlde mock content store review'da reject)
- [ ] **RevenueCat** offerings + product IDs hazırla; paywall'da `Purchases.configure/getOfferings/purchasePackage/restorePurchases` açılacak
- [ ] **EAS setup** — `eas.json` yok, `eas build:configure` çalıştır (prod/preview profilleri, iOS `buildNumber` auto-increment, Android `app-bundle`)
- [ ] **App Store Connect + Play Console**:
  - Privacy Nutrition Labels / Data Safety formu
  - Demo hesap bilgisi (store listing) — login-wall arkasındaki app için Apple şart koşar
  - Data Deletion URL (Play Console)
  - Age rating: 13+ (astroloji/ilişki)
  - Ekran görüntüleri + preview video

### Kod tarafı (yapılacak)
- [ ] **Sentry crash reporting** — `@sentry/react-native` kurulumu, `app/_layout.tsx`'te init, `lib/api/*` error capture
- [ ] **Accessibility label pass** — `Grep accessibilityLabel` → 0 occurrence. Button'lara default `accessibilityRole="button"`, ikonlara label, `maxFontSizeMultiplier={1.3}`, kontrast fix (`textMute` 0.40 → 0.65)
- [ ] **`app/(auth)/birth.tsx` bespoke date picker** — tasarımdaki month-strip/day-grid UI (profile save contract'ı bozmadan)
- [ ] **Home tab transit list** — horoscope API'sinden gelen veriyle render (şu an boş)
- [ ] **Haptic feedback** — `expo-haptics` ile CTA press, slide geçişi, reveal moment (`selectionAsync`, `notificationAsync` success)
- [ ] **SafeArea dynamic** — header padding hardcode 54 yerine `useSafeAreaInsets().top`; tab bar bottom inset
- [ ] **Android colored shadow** — nebula glow halo'lar Android'de gri görünüyor (`elevation` tek parametreli); `react-native-shadow-2` veya Skia drop shadow
- [ ] **BackHandler** — Android donanım back tuşu modal'larda (`paywall`, `invite`) yakalanmıyor
- [ ] **Starfield optimizasyonu** — 80 star × tek `Animated.View`; tek shared value + stagger offset ile draw call %60 azalt
- [ ] **`React.memo`** — ZodiacGlyph, Chip, tab bar elementleri

---

## 🟢 İleride (launch sonrası)

- [ ] **Light theme** — `useColorScheme` + token switch (şu an dark-locked)
- [ ] **Unit + E2E test** (Jest + Maestro/Detox)
- [ ] **CI** (GitHub Actions — tsc + lint + test)
- [ ] **PostHog analytics** (AD_ID + ATT permission ekle)
- [ ] **Push notifications** — zaten skeleton var, prod sertifikaları + cron
- [ ] **PDF rapor renderer** — tek seferlik satın alımlar için
- [ ] **Natal Edge Function** — Ay/Yükselen için sweph/swisseph-wasm (şu an Güneş MVP)
- [ ] **A/B test adayları**:
  - Paywall copy: "7 Gün Ücretsiz Dene ✦" vs "Yıldızlarını Kilitleme ✦"
  - Onboarding auto-rotate vs swipe
  - Reveal moment 2-faz vs 3-faz
  - Tab bar Unicode glyph vs Phosphor/Iconoir icon lib
- [ ] **Legacy klasör temizliği** — `kozmosgenel/` + `kozmosilk/` (kullanıcı onayıyla sil)
- [ ] **Empty feature klasörleri** — `features/{daily,natal,synastry,numerology,nameCompat,pastlife}` — ya doldur ya sil
- [ ] **Mock data env guard** — release build'de `EXPO_PUBLIC_AI_ENABLED` false ise fail-fast

---

## Dosya Referansları

### Migrations (prod'a deploy edilecek)
- `supabase/migrations/0001_init.sql`
- `supabase/migrations/0002_interpretations_feedback.sql`
- `supabase/migrations/0004_*.sql`
- `supabase/migrations/0005_ai_usage.sql` ⭐
- `supabase/migrations/0006_feedback_fix.sql` ⭐
- `supabase/migrations/0007_interpretations_ttl.sql` ⭐
- `supabase/migrations/0008_delete_account.sql` ⭐

### Edge Functions
- `supabase/functions/ai-complete/index.ts` (hardened)
- `supabase/functions/delete-account/index.ts` ⭐ yeni

### Core lib
- `lib/supabase.ts`, `lib/storage/secureStorage.ts`
- `lib/api/ai.ts`, `lib/api/users.ts`, `lib/api/synastry.ts`
- `lib/astro/fingerprint.ts`, `lib/cache/remote.ts`

### Design system
- `constants/designTokens.ts` ⭐
- `components/nebula/*`
- `components/ui/*`
- `components/nav/NebulaTabBar.tsx` ⭐

---

> ⭐ = bu turda eklendi/büyük değişiklik
