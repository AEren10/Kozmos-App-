import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

/**
 * Supabase Auth storage adapter.
 * - Native: expo-secure-store (Keychain / EncryptedSharedPreferences)
 * - Web: AsyncStorage fallback (SecureStore not supported)
 *
 * SecureStore has a ~2KB per-value limit. Supabase session JSON can exceed
 * that when refresh tokens are long; we transparently chunk values across
 * multiple keys: `<key>` stores the chunk count, `<key>.<i>` stores each part.
 */

const CHUNK_SIZE = 1800;
const COUNT_SUFFIX = "__chunks";

type Storage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

const webStorage: Storage = {
  getItem: (k) => AsyncStorage.getItem(k),
  setItem: (k, v) => AsyncStorage.setItem(k, v),
  removeItem: (k) => AsyncStorage.removeItem(k),
};

const nativeStorage: Storage = {
  async getItem(key) {
    const head = await SecureStore.getItemAsync(key);
    if (head === null) return null;
    if (!head.startsWith(COUNT_SUFFIX + ":")) return head;
    const count = parseInt(head.slice(COUNT_SUFFIX.length + 1), 10);
    if (!Number.isFinite(count) || count <= 0) return null;
    const parts: string[] = [];
    for (let i = 0; i < count; i++) {
      const part = await SecureStore.getItemAsync(`${key}.${i}`);
      if (part === null) return null;
      parts.push(part);
    }
    return parts.join("");
  },
  async setItem(key, value) {
    // Clear any prior chunked state for this key
    await clearChunks(key);
    if (value.length <= CHUNK_SIZE) {
      await SecureStore.setItemAsync(key, value);
      return;
    }
    const chunks: string[] = [];
    for (let i = 0; i < value.length; i += CHUNK_SIZE) {
      chunks.push(value.slice(i, i + CHUNK_SIZE));
    }
    await SecureStore.setItemAsync(key, `${COUNT_SUFFIX}:${chunks.length}`);
    for (let i = 0; i < chunks.length; i++) {
      await SecureStore.setItemAsync(`${key}.${i}`, chunks[i]);
    }
  },
  async removeItem(key) {
    await clearChunks(key);
    await SecureStore.deleteItemAsync(key);
  },
};

async function clearChunks(key: string): Promise<void> {
  const head = await SecureStore.getItemAsync(key);
  if (head === null || !head.startsWith(COUNT_SUFFIX + ":")) return;
  const count = parseInt(head.slice(COUNT_SUFFIX.length + 1), 10);
  if (!Number.isFinite(count)) return;
  for (let i = 0; i < count; i++) {
    await SecureStore.deleteItemAsync(`${key}.${i}`);
  }
}

export const secureStorage: Storage = Platform.OS === "web" ? webStorage : nativeStorage;
