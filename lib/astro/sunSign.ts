import { ZODIAC, type ZodiacSign } from "@/constants/zodiac";

export function sunSignFromDate(date: Date): ZodiacSign {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  for (const [key, v] of Object.entries(ZODIAC) as [ZodiacSign, (typeof ZODIAC)[ZodiacSign]][]) {
    const [fm, fd] = v.from;
    const [tm, td] = v.to;
    if (fm === tm) {
      if (m === fm && d >= fd && d <= td) return key;
    } else {
      if ((m === fm && d >= fd) || (m === tm && d <= td)) return key;
    }
  }
  return "capricorn";
}

export function sunSignFromISO(iso: string): ZodiacSign {
  return sunSignFromDate(new Date(iso));
}
