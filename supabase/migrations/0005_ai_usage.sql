-- Per-user AI usage tracking for rate limiting.
-- Buckets: minute_bucket = floor(epoch / 60), day_bucket = floor(epoch / 86400).

create table if not exists public.ai_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  minute_bucket bigint not null,
  day_bucket bigint not null,
  minute_count int not null default 0,
  day_count int not null default 0,
  day_token_sum int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, minute_bucket, day_bucket)
);

create index if not exists ai_usage_user_day_idx on public.ai_usage (user_id, day_bucket);

alter table public.ai_usage enable row level security;

-- User can read only their own rows; writes are restricted to service_role
-- (edge function uses the service key for the upsert).
create policy "ai_usage_self_read" on public.ai_usage
  for select using (auth.uid() = user_id);

create policy "ai_usage_service_insert" on public.ai_usage
  for insert with check (auth.role() = 'service_role');

create policy "ai_usage_service_update" on public.ai_usage
  for update using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

-- Atomic counter increment. Called by the edge function with service role.
create or replace function public.ai_usage_increment(
  p_user_id uuid,
  p_minute_bucket bigint,
  p_day_bucket bigint,
  p_tokens int
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.ai_usage (
    user_id, minute_bucket, day_bucket,
    minute_count, day_count, day_token_sum, updated_at
  ) values (
    p_user_id, p_minute_bucket, p_day_bucket,
    1, 1, greatest(p_tokens, 0), now()
  )
  on conflict (user_id, minute_bucket, day_bucket) do update set
    minute_count = public.ai_usage.minute_count + 1,
    day_count    = public.ai_usage.day_count + 1,
    day_token_sum = public.ai_usage.day_token_sum + greatest(p_tokens, 0),
    updated_at   = now();
end;
$$;

revoke all on function public.ai_usage_increment(uuid, bigint, bigint, int) from public;
grant execute on function public.ai_usage_increment(uuid, bigint, bigint, int) to service_role;
