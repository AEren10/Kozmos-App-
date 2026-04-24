-- Zengin profil: her ekstra alan kullanıcının deneyimini kişiselleştirir

alter table public.profiles
  add column if not exists gender text,
  add column if not exists pronouns text,
  add column if not exists relationship_status text,
  add column if not exists focus_areas text[],
  add column if not exists current_question text,
  add column if not exists experience_level text,
  add column if not exists tone_preference text,
  add column if not exists goals text[],
  add column if not exists birth_time_known boolean default false,
  add column if not exists notify_time text default '08:00',
  add column if not exists partner_birth_date date,
  add column if not exists partner_name text,
  add column if not exists onboarded_at timestamptz,
  add column if not exists last_active_at timestamptz default now();

-- Günlük mood check-in
create table if not exists public.mood_checkins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  date date not null,
  mood int check (mood between 1 and 5),
  energy int check (energy between 1 and 5),
  top_of_mind text,
  tags text[],
  created_at timestamptz default now(),
  unique (user_id, date)
);

alter table public.mood_checkins enable row level security;
create policy "mood_self" on public.mood_checkins for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Günlük journal / sabah-akşam refleksiyonu
create table if not exists public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  date date not null,
  prompt text,
  entry text,
  sentiment int,
  created_at timestamptz default now()
);

alter table public.journal_entries enable row level security;
create policy "journal_self" on public.journal_entries for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists journal_user_date_idx on public.journal_entries (user_id, date desc);

-- Achievements (rozetler)
create table if not exists public.achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  code text not null,
  earned_at timestamptz default now(),
  unique (user_id, code)
);

alter table public.achievements enable row level security;
create policy "achievements_self" on public.achievements for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Saved partners (sinastri listesi)
create table if not exists public.saved_partners (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text,
  birth_date date,
  birth_time time,
  birth_place text,
  label text,
  created_at timestamptz default now()
);

alter table public.saved_partners enable row level security;
create policy "partners_self" on public.saved_partners for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Daily horoscope history (arşiv)
create table if not exists public.daily_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  date date not null,
  content text,
  saved boolean default false,
  created_at timestamptz default now(),
  unique (user_id, date)
);

alter table public.daily_history enable row level security;
create policy "history_self" on public.daily_history for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
