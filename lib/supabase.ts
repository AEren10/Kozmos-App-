import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import { secureStorage } from "@/lib/storage/secureStorage";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: secureStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const isSupabaseConfigured = () => Boolean(SUPABASE_URL) && Boolean(SUPABASE_ANON_KEY);

export { SUPABASE_ANON_KEY };
