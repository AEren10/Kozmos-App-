-- 0008 — Hesap silme: auth.users silindiğinde kullanıcıya ait satırların cascade'lenmesi.
-- Edge function `delete-account` tetikleyici; burada DB tarafında emniyet kemeri kuruyoruz.

-- Profiles: user_id auth.users(id) FK -> on delete cascade.
do $$
declare
  fk_name text;
begin
  select conname into fk_name
  from pg_constraint
  where conrelid = 'public.profiles'::regclass
    and contype = 'f'
    and pg_get_constraintdef(oid) ilike '%auth.users%';

  if fk_name is not null then
    execute format('alter table public.profiles drop constraint %I', fk_name);
  end if;

  begin
    alter table public.profiles
      add constraint profiles_user_id_fkey
      foreign key (user_id) references auth.users(id) on delete cascade;
  exception when undefined_column then
    -- user_id kolonu farklı adlandırılmışsa sessiz geç.
    null;
  end;
end
$$;

-- Interpretations user-scoped ise aynı şekilde cascade.
do $$
declare
  has_user_id boolean;
  fk_name text;
begin
  select exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'interpretations' and column_name = 'user_id'
  ) into has_user_id;

  if has_user_id then
    select conname into fk_name
    from pg_constraint
    where conrelid = 'public.interpretations'::regclass
      and contype = 'f'
      and pg_get_constraintdef(oid) ilike '%auth.users%';

    if fk_name is not null then
      execute format('alter table public.interpretations drop constraint %I', fk_name);
    end if;

    begin
      alter table public.interpretations
        add constraint interpretations_user_id_fkey
        foreign key (user_id) references auth.users(id) on delete cascade;
    exception when others then null;
    end;
  end if;
end
$$;

-- ai_usage FK cascade.
do $$
declare
  tbl_exists boolean;
  fk_name text;
begin
  select exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'ai_usage'
  ) into tbl_exists;

  if tbl_exists then
    select conname into fk_name
    from pg_constraint
    where conrelid = 'public.ai_usage'::regclass
      and contype = 'f'
      and pg_get_constraintdef(oid) ilike '%auth.users%';

    if fk_name is not null then
      execute format('alter table public.ai_usage drop constraint %I', fk_name);
    end if;

    begin
      alter table public.ai_usage
        add constraint ai_usage_user_id_fkey
        foreign key (user_id) references auth.users(id) on delete cascade;
    exception when others then null;
    end;
  end if;
end
$$;
