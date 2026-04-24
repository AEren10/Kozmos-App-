import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types";

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile) ?? null;
}

export async function upsertProfile(p: Partial<Profile> & { id: string }): Promise<void> {
  const { error } = await supabase.from("profiles").upsert(p);
  if (error) throw error;
}
