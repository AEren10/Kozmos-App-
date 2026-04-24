# Supabase Seeds

Seed files in this folder are **NEVER** executed automatically by migrations.
They are intended strictly for local development.

## Demo user

`demo_user.sql` creates a demo account:

- email: `demo@kozmos.app`
- password: `demo1234`

Run manually after a local reset:

```bash
supabase db reset
psql "$SUPABASE_DB_URL" -f supabase/seeds/demo_user.sql
```

**Do not** run these on staging or production.
