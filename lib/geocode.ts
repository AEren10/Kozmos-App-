/**
 * Nominatim (OpenStreetMap) geocoding — ücretsiz, API key gerektirmez.
 * Usage limit: 1 req/sec. Kullanımda debounce + cache kullan.
 */

type GeocodeHit = { name: string; lat: number; lon: number; country?: string };

export async function geocodeCity(query: string): Promise<GeocodeHit[]> {
  if (query.trim().length < 2) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&featuretype=city`;
    const res = await fetch(url, {
      headers: { "User-Agent": "KozmosApp/1.0" },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{ display_name: string; lat: string; lon: string; address?: { country?: string } }>;
    return data.map((d) => ({
      name: d.display_name.split(",").slice(0, 2).join(", "),
      lat: Number(d.lat),
      lon: Number(d.lon),
      country: d.address?.country,
    }));
  } catch {
    return [];
  }
}
