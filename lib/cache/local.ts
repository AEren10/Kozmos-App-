import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "kozmos:cache:";

type Entry<T> = { value: T; expiresAt: number | null };

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as Entry<T>;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      AsyncStorage.removeItem(PREFIX + key);
      return null;
    }
    return entry.value;
  } catch {
    return null;
  }
}

export async function cacheSet<T>(key: string, value: T, ttlMs: number | null = null): Promise<void> {
  const entry: Entry<T> = { value, expiresAt: ttlMs ? Date.now() + ttlMs : null };
  await AsyncStorage.setItem(PREFIX + key, JSON.stringify(entry));
}

export async function cacheClear(keyPrefix?: string) {
  const all = await AsyncStorage.getAllKeys();
  const target = all.filter((k) => k.startsWith(PREFIX + (keyPrefix ?? "")));
  await AsyncStorage.multiRemove(target);
}
