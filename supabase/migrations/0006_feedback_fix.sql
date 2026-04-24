-- M1 — Feedback trigger anahtar uyuşmazlığı düzeltmesi.
-- Problem: feedback.content_hash genellikle "daily:<date>:<sign>" şeklinde
-- gönderiliyor, interpretations.key ise
-- "daily:<date>:<sign>[:<moon>][:<rising>]" formatında. Eski trigger
-- tam eşleşme aradığı için hiçbir satır güncellenmiyordu.
-- Çözüm: prefix match (LIKE) + aktif dil için tüm ilgili satırları güncelle.

create or replace function public.apply_feedback()
returns trigger
language plpgsql
security definer
as $$
declare
  pattern text;
begin
  if new.content_hash is null or length(new.content_hash) = 0 then
    return new;
  end if;

  pattern := new.content_hash || '%';

  if new.rating = 1 then
    update public.interpretations
       set positive_votes = coalesce(positive_votes, 0) + 1,
           updated_at = now()
     where key like pattern
        or key = new.content_hash;
  elsif new.rating = -1 then
    update public.interpretations
       set negative_votes = coalesce(negative_votes, 0) + 1,
           updated_at = now(),
           needs_regenerate = case
             when coalesce(negative_votes, 0) + 1 >= 3
                  and (coalesce(negative_votes, 0) + 1) > coalesce(positive_votes, 0)
             then true
             else needs_regenerate
           end
     where key like pattern
        or key = new.content_hash;
  end if;

  return new;
end;
$$;

drop trigger if exists feedback_apply on public.feedback;
create trigger feedback_apply
  after insert on public.feedback
  for each row execute function public.apply_feedback();

create index if not exists interpretations_key_prefix_idx
  on public.interpretations (key text_pattern_ops);
