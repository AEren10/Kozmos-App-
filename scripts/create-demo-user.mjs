#!/usr/bin/env node

const TOKEN = "sbp_aa684de7de1709ecdfdf9bb9de8cf77b29d212df";
const REF = "doesvekonokhlufofeep";

const SQL = `
do $$
declare uid uuid := gen_random_uuid();
begin
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) values (
    '00000000-0000-0000-0000-000000000000',
    uid, 'authenticated', 'authenticated',
    'demo@kozmos.app',
    crypt('demo1234', gen_salt('bf', 10)),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"display_name":"Demo"}'::jsonb,
    now(), now(),
    '', '', '', ''
  );

  insert into auth.identities (
    id, user_id, provider_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) values (
    gen_random_uuid(), uid, 'demo@kozmos.app',
    jsonb_build_object('sub', uid::text, 'email', 'demo@kozmos.app', 'email_verified', true),
    'email', now(), now(), now()
  );

  insert into public.profiles (
    id, email, display_name, birth_date, birth_time, birth_place,
    birth_lat, birth_lon, sun_sign, is_premium, created_at
  ) values (
    uid, 'demo@kozmos.app', 'Demo',
    '1999-07-23', '08:30:00', 'İstanbul',
    41.0082, 28.9784, 'leo', true, now()
  )
  on conflict (id) do update set is_premium = true;
end $$;
`;

const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query: SQL }),
});

console.log("status:", res.status);
const data = await res.json();
console.log(JSON.stringify(data, null, 2));
