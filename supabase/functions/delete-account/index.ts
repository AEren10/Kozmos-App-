// Supabase Edge Function: /delete-account
// Verifies the caller's JWT and deletes the auth user (cascade via FK / migration 0008).
// Deploy: supabase functions deploy delete-account
// Secrets: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, apikey, content-type, x-client-info",
  "access-control-allow-methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const authHeader = req.headers.get("authorization") ?? "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) {
    return json({ error: "unauthorized" }, 401);
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return json({ error: "server_misconfigured" }, 500);
  }

  const jwt = authHeader.slice(7).trim();

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Resolve user from JWT using admin client.
  const { data: userData, error: userErr } = await admin.auth.getUser(jwt);
  if (userErr || !userData?.user) {
    return json({ error: "invalid_token" }, 401);
  }
  const userId = userData.user.id;

  // Best-effort cleanup of user-owned rows (RLS-scoped tables).
  // The 0008 migration also enforces cascade on auth.users delete.
  const tablesToClean = [
    "profiles",
    "interpretations",
    "ai_usage",
    "interpretations_feedback",
    "daily_checkins",
    "journal_entries",
    "compatibility_reports",
  ];

  for (const t of tablesToClean) {
    // Ignore errors for tables that don't exist / don't have user_id column.
    try {
      await admin.from(t).delete().eq("user_id", userId);
    } catch (_) {
      // swallow
    }
  }

  const { error: delErr } = await admin.auth.admin.deleteUser(userId);
  if (delErr) {
    return json({ error: "delete_failed", detail: delErr.message }, 500);
  }

  return json({ ok: true });
});
