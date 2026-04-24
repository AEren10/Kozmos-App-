-- M4 — Interpretations için TTL.
-- daily:* -> 24 saat, synastry:*/natal:* -> 30 gün,
-- numerology:*/name:* -> kalıcı (null).
-- Uygulama tarafı `expires_at < now()` satırları yok sayar.

alter table public.interpretations
  add column if not exists expires_at timestamptz;

create index if not exists interpretations_expires_idx
  on public.interpretations (key, expires_at);

-- Var olan satırlara geri doldurma (backfill).
update public.interpretations
   set expires_at = created_at + interval '24 hours'
 where expires_at is null
   and key like 'daily:%';

update public.interpretations
   set expires_at = created_at + interval '30 days'
 where expires_at is null
   and (key like 'synastry:%' or key like 'natal:%');

-- numerology/name/sun/moon/rising/mood/aspect/house/theme -> kalıcı kalır.

-- Upsert'lerde expires_at'i otomatik ayarlamak için trigger.
create or replace function public.interpretations_set_ttl()
returns trigger
language plpgsql
as $$
begin
  if new.expires_at is null then
    if new.key like 'daily:%' then
      new.expires_at := coalesce(new.created_at, now()) + interval '24 hours';
    elsif new.key like 'synastry:%' or new.key like 'natal:%' then
      new.expires_at := coalesce(new.created_at, now()) + interval '30 days';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists interpretations_ttl on public.interpretations;
create trigger interpretations_ttl
  before insert on public.interpretations
  for each row execute function public.interpretations_set_ttl();
