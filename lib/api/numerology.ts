export type NumerologyResult = {
  lifePath: number;
  expression: number;
  personality: number;
  summary: string;
};

const LETTER_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

function reduce(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = n
      .toString()
      .split("")
      .reduce((s, c) => s + Number(c), 0);
  }
  return n;
}

export function numerology(name: string, birthDate: string): NumerologyResult {
  const digits = birthDate.replace(/\D/g, "");
  const lifePath = reduce(digits.split("").reduce((s, c) => s + Number(c), 0));

  const clean = name.toLowerCase().replace(/[^a-zçğıöşü]/g, "");
  const expression = reduce(
    clean
      .split("")
      .map((c) => LETTER_MAP[c] ?? 0)
      .reduce((s, n) => s + n, 0),
  );
  const vowels = clean.match(/[aeiouöüı]/g) ?? [];
  const personality = reduce(vowels.map((c) => LETTER_MAP[c] ?? 0).reduce((s, n) => s + n, 0));

  return { lifePath, expression, personality, summary: `Yaşam yolu ${lifePath}, ifade ${expression}, kişilik ${personality}.` };
}
