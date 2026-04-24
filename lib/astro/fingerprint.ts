import { sha256 } from "js-sha256";
import type { BirthData } from "@/types";

// SHA-256 -> base64url kısaltma. 32 karaktere kırpıyoruz; kolizyon olasılığı
// 2^128 mertebesinde ve cache anahtarı için fazlasıyla yeterli.
function shortHash(input: string): string {
  const bytes = sha256.array(input) as number[];
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = typeof btoa === "function"
    ? btoa(bin)
    : Buffer.from(bin, "binary").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "").slice(0, 32);
}

export function birthFingerprint(b: BirthData): string {
  const parts = [
    b.birth_date,
    b.birth_time ?? "0000",
    b.birth_lat?.toFixed(2) ?? "0",
    b.birth_lon?.toFixed(2) ?? "0",
  ];
  return shortHash(parts.join("|"));
}

export function synastryFingerprint(a: BirthData, b: BirthData): string {
  const pair = [birthFingerprint(a), birthFingerprint(b)].sort().join("::");
  return shortHash(pair);
}

export function nameFingerprint(name: string): string {
  return shortHash(name.trim().toLowerCase());
}
