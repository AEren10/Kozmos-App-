# Premium Dil Öğrenme Arayüzü

_Started 2026-04-22 14:31 UTC_

---

## User

FlashcardMobile

  Ne: Türkçe konuşan kullanıcılar için İngilizce kelime öğrenme uygulaması. Flashcard (çevir-gör), SRS
  (spaced repetition) ve çoktan seçmeli quiz ile kelime ezberletir.

  Kim için: Öğrenciler, dil öğrenenler — mobile-first, günde 5-10 dakikada kullanılacak kısa seanslar.

  Temel akış:
  1. Hazır public listelerden birini seç (Günlük İngilizce, Renkler, Sayılar…) veya kendi listeni oluştur
  2. Çalış → flashcard'ı çevir, telaffuzu dinle, Again/Zor/İyi/Kolay ile kendini değerlendir
  3. Quiz → 4 şıklı, doğru-yanlış feedback, ≥%80'de konfeti
  4. İlerleme → günlük hedef barı, seri 🔥, rozetler, zor kelimelerin otomatik listesi
  5. Paylaş → kendi listeni public yap, başkaları favorileyip çalışabilsin

  Hissiyat: Sade ama canlı. Duolingo kadar oyunlaştırılmış değil, Anki kadar kuru da değil — ortası. Günlük
   challenge kartı, streak rozetleri, maskot, yumuşak animasyonlar, haptic her yerde.

  Teknik: Expo React Native, Supabase backend, light/dark mode, SRS algoritması (SM-2 light).

  Marka sinyali: Öğrenmeyi baskı değil alışkanlık gibi hissettiren. "Bugün 10 kelime, 2 dakikan var mı?"
  tonu.

## Assistant

_[tool: questions_v2]_

## User

Questions answered:
- screens: Ana ekran / Liste seçimi, Flashcard çalışma ekranı, Liste oluşturma
- visual_style: 2
- mascot: Evet, sevimli bir karakter (soyut/geometrik)
- card_flip: Karar ver
- variations: 2 — farklı ton/renk
- dark_mode: Sadece light
- extra_wishes: canlı ve kullanıcıyı appde tutmak için bir tassarım istiyorum ayrıca sade ve kullanım kolaylığı sağlamalı

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: update_todos]_

Now let me build the full prototype. I'll create 2 color variations — one indigo/violet modern palette and one teal/emerald fresh palette — with all 3 screens (Home, Flashcard, List Creation) as an interactive flow inside iOS frames on a design canvas.

_[tool: write_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

İşte **FlashcardMobile** prototipin hazır! 🎉

**İki renk yönü yan yana:**
- **A · İndigo Gece** — mor/indigo tonlarında modern ve enerjik
- **B · Okyanus Teal** — teal/yeşil tonlarında ferah ve sakin

**Etkileşimli özellikler:**
- 🏠 **Ana ekran** — streak, günlük hedef barı, günün meydan okuması, kelime listeleri
- 🃏 **Flashcard** — 3D kart çevirme, Tekrar/Zor/İyi/Kolay değerlendirme, swipe animasyonu
- ✏️ **Liste oluştur** — kelime ekleme, herkese açık toggle, maskot ipuçları

Her iki prototipi de tıklayarak ekranlar arasında gezinebilirsin. Artboard'a çift tıklarsan tam ekran odak modunda açılır.

**Sonraki adımlar:**
- Quiz ekranı ve ilerleme/rozet sayfası eklenebilir
- Konfeti animasyonu, haptic geri bildirim detayları
- Renk/font tweakleri için tercihini söyle

## User

gayet güzel gidiyor ama çok klasik olmuş maalesef beğenmedim 

Bir dil öğrenme uygulaması için mobile home screen tasarla. 

Genel vizyon:
- Duolingo/standart tasarımlardan tamamen farklı, daha "premium & playful" bir his
- Glassmorphism değil, bold ve cesur bir renk dili — koyu/vibrant bir tema (koyu lacivert veya deep teal base)
- Büyük, ekspresif tipografi
- Organic shape'ler (blob, wave) arka planda dekoratif element olarak
- Micro-interaction'ları hissettiren tasarım — butonlar, kartlar üzerinde hover/press state'leri belirtilmiş olsun

İçerik yapısı (soldaki ekranla aynı):
- Üstte selamlama + kullanıcı avatarı
- Streak + günlük hedef progress bar kartı
- "Günün meydan okuması" featured card (büyük, eye-catching)
- Kelime listeleri (her biri emoji ikonlu, ok ile)
- Alt navigasyon

Animasyon notları (ekrana yaz):
- Streak sayısı: bounce-in animasyonu
- Progress bar: dolma animasyonu (ease-in-out)
- Featured card: subtle floating/pulse
- Liste itemları: staggered slide-up ile giriş
- Bottom tab aktif item: spring scale animasyonu

Renk paleti: Deep navy (#0D1B2A) veya Rich dark teal (#0A2A2A) base, accent olarak vibrant lime-green (#B4FF4F) veya electric coral — ikisinden bir öneri sun

sayfalarım; 

- LoginScreen — giriş
  - RegisterScreen — kayıt
  - ForgotPasswordScreen — şifre sıfırlama

  🏠 Ana Akış (Tab'lar)

  - HomeScreen — keşfet / kategoriler / daily challenge
  - MyListsScreen — kendi listelerim
  - FavoritesScreen — favori listeler
  - ProfileScreen — profil, ayarlar, tema, çıkış, hesap sil

  📖 Liste & Çalışma (4)

  - CreateListScreen — yeni liste oluştur (772 satır — refactor bekliyor)
  - FlashcardDetailScreen — liste detayı, kelimeler
  - StudyScreen — SRS ile kart çalışma (AGAIN/HARD/GOOD/EASY)
  - QuizScreen — çoktan seçmeli quiz

  📊 Ek (2)

  - HardWordsScreen — zorlandığın kelimeler
  - StreakScreen — seri & rozetler

## Assistant

_[tool: invoke_skill]_

_[tool: set_project_title]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: done]_

_[tool: fork_verifier_agent]_

_[tool: snip]_

İşte **FlashcardMobile v2** — tamamen yeniden tasarlandı! 🚀

**Tasarım yönü:**
- **Deep Navy (#0B1520)** base + **Electric Lime (#B4FF4F)** accent — cesur, premium, farklı
- **Space Grotesk + Instrument Serif** tipografi çifti — modern ama sıcak
- Organic blob & wave dekorasyonlar arka planda
- Her yerde micro-interaction: bounce-in streak, dolum animasyonlu progress bar, floating mascot, staggered list giriş, spring tab scale

**3 etkileşimli ekran:**
- 🏠 **Home** — streak kartı, günlük hedef, meydan okuma kartı (hover glow efekti), kelime listeleri + animasyon notları
- 🃏 **Flashcard Study** — 3D flip, swipe-out, AGAIN/HARD/GOOD/EASY rating
- ✏️ **Liste Oluştur** — lime accent input, mascot ipucu, toggle

**Sonraki adımlar:**
- Diğer ekranlar (Quiz, Login, Profile, Streak/Rozetler) eklenebilir
- Renk paleti veya accent değişikliği istersen söyle
- Gerçek kelime verisi veya farklı layout denemeleri yapabilirizVerifier geçti, her şey yolunda. Devam etmemi istediğin ekranlar varsa söyle — Login, Quiz, Profil, Streak/Rozetler hangisini önce yapalım?

## User

Save this design as a PDF: Kozmos.html

## Assistant

_[tool: read_file]_

## User

Save as standalone HTML: Kozmos.html

## User

Send this design to Canva: Kozmos.html

## User

Save as standalone HTML: Kozmos.html

## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: copy_files]_

_[tool: str_replace_edit]_

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

No errors — just the expected Babel dev warning. The standalone file works.

_[tool: present_fs_item_for_download]_

_[tool: snip]_

İşte standalone dosyan hazır — tek bir HTML dosyası, internet bağlantısı olmadan da çalışır. ☝️ İndirebilirsin.

## User

Send this design to Canva: Kozmos.html

## Assistant

_[tool: present_fs_item_for_download]_

_[tool: tool_search_tool_bm25]_

No Canva import tool found. You'll need to connect Canva first.

**Canva bağlı değil.** Sol paneldeki **Connectors** bölümünden Canva'yı bağla, sonra tekrar dene. Yeni sekmede bağlandıktan sonra bu sekmeye dönmen yeterli — sayfa yenilemesi gerekmez.

Bu arada, standalone HTML dosyasını zaten hazırladık — onu Canva'ya manuel olarak da yükleyebilirsin:Canva bağlandığında tekrar "Send to Canva" de, doğrudan aktarırım. Şimdilik bu dosyayı indirip Canva'ya yükleyebilirsin.

