# Chat

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

