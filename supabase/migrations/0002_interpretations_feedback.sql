-- Feedback-driven learning:
-- Her yorumun pozitif/negatif oy sayısı tutulur.
-- Negative oranı yüksek bloklar `regenerate_queue`'ya düşer, seed script onları yeniden üretir.

alter table public.interpretations
  add column if not exists positive_votes int default 0,
  add column if not exists negative_votes int default 0,
  add column if not exists updated_at timestamptz default now(),
  add column if not exists needs_regenerate boolean default false;

-- Feedback insert trigger: her oy interpretation'ın sayısına yansır
create or replace function public.apply_feedback()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.rating = 1 then
    update public.interpretations
      set positive_votes = positive_votes + 1
      where key = new.content_hash;
  elsif new.rating = -1 then
    update public.interpretations
      set negative_votes = negative_votes + 1,
          needs_regenerate = case
            when negative_votes + 1 >= 3 and (negative_votes + 1) > positive_votes then true
            else needs_regenerate
          end
      where key = new.content_hash;
  end if;
  return new;
end;
$$;

drop trigger if exists feedback_apply on public.feedback;
create trigger feedback_apply
  after insert on public.feedback
  for each row execute function public.apply_feedback();

-- Helper view: blok sağlığı
create or replace view public.interpretation_health as
select
  key,
  lang,
  positive_votes,
  negative_votes,
  case
    when positive_votes + negative_votes = 0 then 0.5
    else positive_votes::float / (positive_votes + negative_votes)
  end as approval_rate,
  needs_regenerate,
  updated_at
from public.interpretations;
