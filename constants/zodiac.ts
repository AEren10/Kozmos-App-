export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export const ZODIAC: Record<ZodiacSign, { name: string; nameTr: string; symbol: string; element: string; from: [number, number]; to: [number, number] }> = {
  aries: { name: "Aries", nameTr: "Koç", symbol: "♈", element: "fire", from: [3, 21], to: [4, 19] },
  taurus: { name: "Taurus", nameTr: "Boğa", symbol: "♉", element: "earth", from: [4, 20], to: [5, 20] },
  gemini: { name: "Gemini", nameTr: "İkizler", symbol: "♊", element: "air", from: [5, 21], to: [6, 20] },
  cancer: { name: "Cancer", nameTr: "Yengeç", symbol: "♋", element: "water", from: [6, 21], to: [7, 22] },
  leo: { name: "Leo", nameTr: "Aslan", symbol: "♌", element: "fire", from: [7, 23], to: [8, 22] },
  virgo: { name: "Virgo", nameTr: "Başak", symbol: "♍", element: "earth", from: [8, 23], to: [9, 22] },
  libra: { name: "Libra", nameTr: "Terazi", symbol: "♎", element: "air", from: [9, 23], to: [10, 22] },
  scorpio: { name: "Scorpio", nameTr: "Akrep", symbol: "♏", element: "water", from: [10, 23], to: [11, 21] },
  sagittarius: { name: "Sagittarius", nameTr: "Yay", symbol: "♐", element: "fire", from: [11, 22], to: [12, 21] },
  capricorn: { name: "Capricorn", nameTr: "Oğlak", symbol: "♑", element: "earth", from: [12, 22], to: [1, 19] },
  aquarius: { name: "Aquarius", nameTr: "Kova", symbol: "♒", element: "air", from: [1, 20], to: [2, 18] },
  pisces: { name: "Pisces", nameTr: "Balık", symbol: "♓", element: "water", from: [2, 19], to: [3, 20] },
};

export const ALL_SIGNS: ZodiacSign[] = Object.keys(ZODIAC) as ZodiacSign[];
