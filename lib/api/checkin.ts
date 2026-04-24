import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { MoodCheckin } from "@/types";

export async function saveCheckin(userId: string, c: MoodCheckin) {
  if (!isSupabaseConfigured()) return;
  await supabase.from("mood_checkins").upsert({
    user_id: userId,
    date: c.date,
    mood: c.mood,
    energy: c.energy,
    top_of_mind: c.top_of_mind ?? null,
    tags: c.tags ?? null,
  });
}

export async function getTodayCheckin(userId: string, date: string): Promise<MoodCheckin | null> {
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase
    .from("mood_checkins")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
    .maybeSingle();
  return data as MoodCheckin | null;
}
