-- Kozmos initial schema
-- Runs once. Idempotent.

create extension if not exists "uuid-ossp";

-- 1) profiles (user başına tek satır, auth.users ile 1-1)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  birth_date date,
  birth_time time,
  birth_place text,
  birth_lat double precision,
  birth_lon double precision,
  sun_sign text,
  moon_sign text,
  rising_sign text,
  is_premium boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "profiles_self_read" on public.profiles for select using (auth.uid() = id);
create policy "profiles_self_upsert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_self_update" on public.profiles for update using (auth.uid() = id);

-- 2) interpretations (universal + user-specific cache; key unique per lang)
create table if not exists public.interpretations (
  key text not null,
  lang text not null default 'tr',
  content text not null,
  version int default 1,
  created_at timestamptz default now(),
  primary key (key, lang)
);

alter table public.interpretations enable row level security;
-- anyone authenticated can read (universal content)
create policy "interp_read" on public.interpretations for select using (auth.role() = 'authenticated');
-- only service role can write (edge function)
create policy "interp_write_service" on public.interpretations for insert with check (auth.role() = 'service_role');

-- 3) user_charts (natal data cache per user)
create table if not exists public.user_charts (
  user_id uuid references auth.users(id) on delete cascade,
  fingerprint text not null,
  chart_json jsonb,
  updated_at timestamptz default now(),
  primary key (user_id, fingerprint)
);

alter table public.user_charts enable row level security;
create policy "charts_self" on public.user_charts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 4) synastry_cache (pair-level)
create table if not exists public.synastry_cache (
  fingerprint_pair text primary key,
  interpretation text,
  score int,
  lang text default 'tr',
  created_at timestamptz default now()
);

alter table public.synastry_cache enable row level security;
create policy "synastry_read" on public.synastry_cache for select using (auth.role() = 'authenticated');
create policy "synastry_write_service" on public.synastry_cache for insert with check (auth.role() = 'service_role');

-- 5) feedback (engagement analytics)
create table if not exists public.feedback (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete set null,
  content_hash text,
  rating int check (rating in (-1, 0, 1)),
  feature text,
  created_at timestamptz default now()
);

alter table public.feedback enable row level security;
create policy "feedback_self_insert" on public.feedback for insert with check (auth.uid() = user_id);
create policy "feedback_self_read" on public.feedback for select using (auth.uid() = user_id);

-- 6) push tokens
create table if not exists public.push_tokens (
  user_id uuid references auth.users(id) on delete cascade,
  token text not null,
  platform text,
  updated_at timestamptz default now(),
  primary key (user_id, token)
);

alter table public.push_tokens enable row level security;
create policy "push_self" on public.push_tokens for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
