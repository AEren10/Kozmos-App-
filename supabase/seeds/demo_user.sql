-- Demo kullanıcı. Giriş bilgileri:
--   email:    demo@kozmos.app
--   password: demo1234
-- Email confirmation atlanır (email_confirmed_at doldurulu).

-- Auth şema extension'ı pgcrypto kullanır
create extension if not exists pgcrypto with schema public;

do $$
declare
  demo_id uuid;
begin
  -- Zaten varsa işlem yok
  select id into demo_id from auth.users where email = 'demo@kozmos.app' limit 1;

  if demo_id is null then
    demo_id := gen_random_uuid();
    insert into auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_token, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_super_admin
    ) values (
      demo_id,
      '00000000-0000-0000-0000-000000000000',
      'authenticated',
      'authenticated',
      'demo@kozmos.app',
      crypt('demo1234', gen_salt('bf')),
      now(),
      '',
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"display_name":"Demo Kullanıcı"}'::jsonb,
      false
    );

    insert into auth.identities (
      id, user_id, provider_id, identity_data, provider, created_at, updated_at, last_sign_in_at
    ) values (
      gen_random_uuid(),
      demo_id,
      demo_id::text,
      jsonb_build_object('sub', demo_id::text, 'email', 'demo@kozmos.app'),
      'email',
      now(),
      now(),
      now()
    );
  end if;

  -- Profile oluştur/güncelle
  insert into public.profiles (
    id, email, display_name, birth_date, birth_time, birth_place,
    birth_lat, birth_lon, sun_sign, is_premium, created_at
  ) values (
    demo_id,
    'demo@kozmos.app',
    'Demo Kullanıcı',
    '1999-07-23',
    '08:30:00',
    'İstanbul',
    41.0082,
    28.9784,
    'leo',
    true,
    now()
  )
  on conflict (id) do update set
    birth_date = excluded.birth_date,
    birth_time = excluded.birth_time,
    birth_place = excluded.birth_place,
    sun_sign = excluded.sun_sign,
    is_premium = true;
end $$;
