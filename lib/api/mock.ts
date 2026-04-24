/**
 * AI henüz bağlı değilken kullanıcıya gerçekçi deneyim göstermek için
 * deterministik mock yanıtlar. Aynı girdi → aynı yanıt.
 */

import type { ZodiacSign } from "@/constants/zodiac";
import { ZODIAC } from "@/constants/zodiac";

function seedHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const DAILY_TR: Record<string, string[]> = {
  fire: [
    "Bugün içindeki ateş gerçekten parlak. Bir işi ertelemiştin — şimdi başlamanın tam zamanı. Aşk tarafında birisi ilk adımı bekliyor; göz temasından daha fazlası gerekecek. Küçük uyarı: Acele kararlar seni bugün pişman edebilir, 10 nefes al sonra konuş.",
    "Enerjin sabahtan yüksek. Öğleden sonra birisi seni sınayacak — sesini büyütme, sertliğini koru. İş ilişkilerinde birikmiş bir gerilim çözülebilir. Aşk tarafında geçmişten bir mesaj düşebilir; cevaplamadan önce ne hissettiğini dinle.",
    "Bugün liderlik enerjisi seninle. İnsanlar sana yönelecek, fırsatları geri çevirme. Bir plan yaparken kalbini değil, takvimini düşün. Akşama doğru bir yakın seni şaşırtabilir.",
  ],
  earth: [
    "Bugün istikrar senin dostun. Yeni bir şey başlatma — devam ettiğin şeye derinlik kat. Para meselesinde küçük bir iyi haber mümkün, büyük karar verme. Aşk için sabır — acele çözüm bulma, pişman olursun.",
    "Beden bugün yavaş, zihin keskin. Kırtasiye/detay işleri burada parlıyor. Birisi senin sabrını zorlayabilir; sen kök salmış bir ağaçsın, rüzgar seni devirmez.",
    "Bugün vücudun sana 'yavaşla' diyor — dinle. Önemli bir konuşmayı yarına ertele. Akşam eve yaklaştığında küçük bir hoş sürpriz var.",
  ],
  air: [
    "Zihnin bugün bir kuş gibi uçuyor — fikirler peş peşe gelecek. Fikri kafada tutma, bir yere yaz, yoksa kaybolur. İletişimde bir yanlış anlaşılma çıkabilir; sabır göster. Aşk tarafında kelimelerin büyülü: kimi etkilemek istiyorsan, bugün söyle.",
    "Sosyal enerjin yüksek, yeni tanışmalara açık ol. İş tarafında küçük bir detay büyük bir şeyi açabilir. Akşam kendine yalnız zaman ayır, zihin fazla doldu.",
    "Bugün seçeneklerin çok, karar vermekte zorlanabilirsin. Bir liste yap, hisset, seç — bu sırayla. Yakın biri seni dinlemek istiyor.",
  ],
  water: [
    "Bugün duyguların yoğun — ama bu bir zayıflık değil, senin süper gücün. Birisinin sana söylemediklerini hissedebilirsin; yorumlamadan önce sor. Aşk derinleşiyor, geçmiş bir iz silinmek üzere. Su iç, dışarı çık, yaz.",
    "Sezgilerin bugün bilinçli aklından daha bilgili. 'Bir şey ters' hissi varsa doğrudur. İş yerinde emosyonel bir konu açılabilir, sınırını koru. Akşam müzik iyi gelir.",
    "Bugün iç dünyan dış dünyandan daha canlı. Bir rüyadan uyanır gibi günü geçireceksin; notlar al, sabaha kalmazlar. Birisi senin sessizliğine saygı duymayı öğrenecek.",
  ],
};

const DAILY_EN: Record<string, string[]> = {
  fire: [
    "The fire inside you burns bright today. A task you've been postponing is ready to start — now is the moment. On love, someone is waiting for your first move. Small warning: rushed decisions may haunt you later, breathe ten times before speaking.",
    "Morning energy is high. In the afternoon, someone will test you — don't raise your voice, keep your edge. Old work tension may dissolve. A message from the past may appear; check what you feel before you reply.",
    "Leadership energy is with you. People will turn to you — don't decline. When planning, think calendar, not heart. Someone close will surprise you by evening.",
  ],
  earth: [
    "Stability is your friend today. Don't start something new — deepen what you're already doing. Small good news is possible on money, don't make big calls yet. Love asks for patience.",
    "Body slow, mind sharp. Admin and detail work shine here. Someone may test your patience; you're a rooted tree, wind won't topple you.",
    "Your body says 'slow down' — listen. Postpone an important conversation by one day. A small gift waits for you near evening.",
  ],
  air: [
    "Your mind flies today — ideas come one after another. Don't hold them in your head, write them down or they'll vanish. Expect one misunderstanding; be patient. Words are magical in love today: say what you want to say.",
    "Social energy is high, be open to new faces. A small detail at work may unlock something big. Give yourself alone time in the evening, the mind is full.",
    "Many options today, decisions may feel hard. Make a list, then feel, then choose — in that order. Someone close wants to be heard.",
  ],
  water: [
    "Feelings run deep today — that's not weakness, it's your superpower. You may sense what someone isn't saying; ask before interpreting. Love deepens, an old trace is ready to fade. Drink water, go outside, write.",
    "Intuition is wiser than logic today. If something feels off, it is. Keep emotional boundaries at work. Music will help tonight.",
    "Your inner world feels louder than the outer one. Take notes — dream-like insights won't survive till morning. Someone will learn to respect your silence.",
  ],
};

export function mockDaily(sign: ZodiacSign, date: string, lang: "tr" | "en"): string {
  const el = ZODIAC[sign].element as keyof typeof DAILY_TR;
  const pool = lang === "tr" ? DAILY_TR[el] : DAILY_EN[el];
  const idx = seedHash(`${sign}:${date}`) % pool.length;
  return pool[idx];
}

export function mockSynastry(a: string, b: string, lang: "tr" | "en"): string {
  if (lang === "tr") {
    return [
      `1) Uyum skoru 74/100 — Birbirinizi tamamlıyorsunuz, ama ikiniz de inatçısınız.`,
      `2) Aşk ve duygusal bağ: İkiniz de sevdiğinizi özel hissettiren bir dile sahipsiniz. ${a} bazen duygularını göstermek için zamana ihtiyaç duyar, ${b} ise hemen söyler. Bu fark çatışma değil, fırsat — biri diğerini yavaşlatır, biri hızlandırır.`,
      `3) İletişim: Kelimelerle ilerliyorsunuz ama aynı cümleyi farklı anlıyorsunuz. "Ne demek istedin?" sorusu ilişkinizin kurtarıcısı.`,
      `4) Zorlu bölge: İkiniz de iktidar kurmayı sever. Evde kimin karar vereceği sürekli pazarlık konusu. Çözüm: günler bölün, her biriniz bir "başkomutan günü" alın.`,
    ].join("\n\n");
  }
  return [
    `1) Compatibility 74/100 — You complete each other, but you're both stubborn.`,
    `2) Love & emotional bond: Both of you have a language that makes the loved one feel special. ${a} sometimes needs time to show feelings; ${b} expresses quickly. This gap is an opportunity, not conflict.`,
    `3) Communication: You move through words but interpret the same sentence differently. "What did you mean?" is the lifeline.`,
    `4) Challenging area: Both of you enjoy the power seat. Daily negotiation over "who decides." Solution: split days, each gets a commander day.`,
  ].join("\n\n");
}

export function mockPastLife(_birthDate: string, lang: "tr" | "en"): string {
  if (lang === "tr") {
    return `Güney Ay Düğümün geçmiş yaşamda senin bir "bilen" olduğunu fısıldıyor. Belki bir kâtip, belki bir şifacı — insanlara ne yapmaları gerektiğini söyleyen biri. Bu rol sana zarif bir otorite kazandırdı ama bir şey de aldı: kendinle yalnız kalmayı, sormadan önce kendi kalbini dinlemeyi.

Bu hayata getirdiğin ders: başkasının sorusundan önce kendi cevabın. Başkasının onayından önce kendi rızan. Geçmişte "bilen" olmanın ağırlığını taşıdın, bu hayatta öğrenen olmanın sevinci seni bekliyor.

Şimdi nereye evrimleşiyorsun? Bildiklerinden soru çıkarabilen, cevabı değil eşliği sunan birine. Yıldızlar bu geçişi destekliyor — pes etme.`;
  }
  return `Your South Node whispers you were a "knower" in a past life. Maybe a scribe, maybe a healer — someone who told people what to do. This role gave you graceful authority but took something: the ability to sit with yourself, to listen to your own heart before asking.

Your lesson in this life: your answer before others' questions. Your consent before others' approval. You carried the weight of being the knower; the joy of being the learner awaits.

Where you're evolving now: someone who makes questions out of what they know, who offers companionship instead of answers. The stars support this transition — don't give up.`;
}
