import type { ZodiacSign } from "@/constants/zodiac";

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  birth_lat: number | null;
  birth_lon: number | null;
  sun_sign: ZodiacSign | null;
  moon_sign: ZodiacSign | null;
  rising_sign: ZodiacSign | null;
  is_premium: boolean;
  created_at: string;
  gender?: string | null;
  pronouns?: string | null;
  relationship_status?: string | null;
  focus_areas?: string[] | null;
  current_question?: string | null;
  experience_level?: "curious" | "casual" | "deep" | null;
  tone_preference?: "mystical" | "grounded" | "playful" | "direct" | null;
  goals?: string[] | null;
  birth_time_known?: boolean;
  notify_time?: string | null;
  partner_birth_date?: string | null;
  partner_name?: string | null;
  onboarded_at?: string | null;
};

export type MoodCheckin = {
  date: string;
  mood: number;
  energy: number;
  top_of_mind?: string;
  tags?: string[];
};

export type JournalEntry = {
  id?: string;
  date: string;
  prompt: string;
  entry: string;
  sentiment?: number;
};

export type Achievement = {
  code: string;
  earned_at: string;
};

export type SavedPartner = {
  id?: string;
  name: string;
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  label?: string;
};

export type BirthData = {
  birth_date: string;
  birth_time?: string;
  birth_place?: string;
  birth_lat?: number;
  birth_lon?: number;
  name?: string;
};

export type NatalChart = {
  sun: ZodiacSign;
  moon: ZodiacSign | null;
  rising: ZodiacSign | null;
  houses: Record<number, ZodiacSign | null>;
  planets: Record<string, { sign: ZodiacSign; house: number | null; degree: number }>;
};

export type Interpretation = {
  key: string;
  content: string;
  lang: "tr" | "en";
  version: number;
  created_at?: string;
  expires_at?: string | null;
};

export type DailyHoroscope = {
  sign: ZodiacSign;
  date: string;
  content: string;
  mood: number;
  love: number;
  career: number;
  health: number;
};

export type SynastryResult = {
  fingerprint: string;
  score: number;
  summary: string;
  sections: { title: string; body: string }[];
};
