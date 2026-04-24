import type { BirthData, NatalChart } from "@/types";
import { sunSignFromISO } from "./sunSign";

/**
 * Client-side şimdilik sadece Güneş burcunu hesaplar.
 * Tam natal chart (Ay, Yükselen, evler, gezegenler) için Supabase Edge Function
 * arka planında Swiss Ephemeris çağrılmalı.
 *
 * Endpoint sözleşmesi (backend kurulunca):
 *   POST {API_BASE_URL}/natal { birth_date, birth_time, birth_lat, birth_lon }
 *   -> NatalChart
 */
export async function computeNatal(b: BirthData): Promise<NatalChart> {
  const base = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (base && b.birth_time && b.birth_lat != null && b.birth_lon != null) {
    try {
      const res = await fetch(`${base}/natal`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(b),
      });
      if (res.ok) return (await res.json()) as NatalChart;
    } catch {
      // fall-through to client fallback
    }
  }
  return {
    sun: sunSignFromISO(b.birth_date),
    moon: null,
    rising: null,
    houses: {},
    planets: {},
  };
}
