import Svg, { Path } from "react-native-svg";

export const ZODIAC_PATHS: Record<string, string> = {
  aries: "M5 18c1-6 4-10 7-10s6 4 7 10 M9 8c0-2 1.2-3 3-3s3 1 3 3",
  taurus: "M12 13a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M5 5c2 2 4 5 7 5s5-3 7-5",
  gemini: "M7 5h10 M7 23h10 M9 5v18 M15 5v18",
  cancer: "M5 9c3-3 7-3 10 0 M19 19c-3 3-7 3-10 0 M7 9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z M17 19a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  leo: "M8 21c-3 0-5-2-5-5s2-5 5-5 5 2 5 5c0 4-2 8-2 8 M13 16c1-6 4-9 7-9 M20 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  virgo: "M5 23V8c0-2 1-3 2-3s2 1 2 3v15 M9 23V8c0-2 1-3 2-3s2 1 2 3v15 M13 23V8c0-2 1-3 2-3s2 1 2 3c0 6-2 10-4 12 1 2 4 3 7 2",
  libra: "M4 22h18 M7 19h12 M12 19c0-6-5-8-5-12a5 5 0 1 1 10 0c0 4-5 6-5 12z",
  scorpio: "M3 10v8c0 2 1 3 2 3s2-1 2-3V10 M7 10v8c0 2 1 3 2 3s2-1 2-3V10 M11 10v8c0 2 1 3 2 3s2-1 2-3v-3c0-3 2-5 5-5l-3-2 M20 5l2 3-3 2",
  sagittarius: "M4 22L20 6 M14 6h6v6 M5 13l4 4",
  capricorn: "M3 8c1 5 3 10 5 12 2-2 2-5 0-7 M8 8v9c0 3 2 5 5 5s5-2 5-5a4 4 0 1 0-4-4",
  aquarius: "M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0 M3 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0",
  pisces: "M5 6c5 3 5 13 0 18 M19 6c-5 3-5 13 0 18 M6 12h12",
};

export function ZodiacGlyph({
  sign,
  size = 24,
  color = "#c4a4ff",
  stroke = 1.5,
}: {
  sign: string;
  size?: number;
  color?: string;
  stroke?: number;
}) {
  const d = ZODIAC_PATHS[sign] || ZODIAC_PATHS.leo;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 28">
      <Path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
