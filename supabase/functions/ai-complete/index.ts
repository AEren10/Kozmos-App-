// Supabase Edge Function: /ai-complete — Anthropic proxy with auth + per-user rate limit.
// Deploy: supabase functions deploy ai-complete
// Secrets: supabase secrets set ANTHROPIC_API_KEY=... SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=...

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const ANTHROPIC_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const ALLOWED_MODELS = new Set([
  "claude-haiku-4-5-20251001",
  "claude-sonnet-4-5-20250929",
]);
const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS_CAP = 4096;
const MAX_PROMPT_CHARS = 16000;
const MAX_SYSTEM_CHARS = 4000;

const RATE_PER_MINUTE = 10;
const RATE_PER_DAY = 100;
const TOKENS_PER_DAY = 500_000;

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, apikey, content-type, x-client-info",
  "access-control-allow-methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders, ...extraHeaders },
  });

type Body = {
  prompt?: unknown;
  system?: unknown;
  maxTokens?: unknown;
  model?: unknown;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const authHeader = req.headers.get("authorization") ?? "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) {
    return json({ error: "unauthorized" }, 401);
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !ANTHROPIC_KEY) {
    return json({ error: "server_misconfigured" }, 500);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userErr } = await admin.auth.getUser(authHeader.slice(7));
  if (userErr || !userData.user) return json({ error: "unauthorized" }, 401);
  const userId = userData.user.id;

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  if (!prompt || prompt.length > MAX_PROMPT_CHARS) return json({ error: "invalid_prompt" }, 400);

  const system = typeof body.system === "string" ? body.system : undefined;
  if (system && system.length > MAX_SYSTEM_CHARS) return json({ error: "invalid_system" }, 400);

  const maxTokensRaw = typeof body.maxTokens === "number" ? body.maxTokens : 800;
  const maxTokens = Math.max(1, Math.min(MAX_TOKENS_CAP, Math.floor(maxTokensRaw)));

  const modelRaw = typeof body.model === "string" ? body.model : DEFAULT_MODEL;
  const model = ALLOWED_MODELS.has(modelRaw) ? modelRaw : DEFAULT_MODEL;

  // Rate limit check (service role -> bypasses RLS)
  const now = Math.floor(Date.now() / 1000);
  const minuteBucket = Math.floor(now / 60);
  const dayBucket = Math.floor(now / 86400);

  const { data: dayRows, error: usageErr } = await admin
    .from("ai_usage")
    .select("minute_bucket, minute_count, day_count, day_token_sum")
    .eq("user_id", userId)
    .eq("day_bucket", dayBucket);
  if (usageErr) return json({ error: "usage_lookup_failed" }, 500);

  let dayCount = 0;
  let dayTokens = 0;
  let minuteCount = 0;
  for (const row of dayRows ?? []) {
    dayCount += row.day_count ?? 0;
    dayTokens += row.day_token_sum ?? 0;
    if (row.minute_bucket === minuteBucket) minuteCount += row.minute_count ?? 0;
  }

  if (minuteCount >= RATE_PER_MINUTE) {
    return json({ error: "rate_limit_minute" }, 429, { "retry-after": "60" });
  }
  if (dayCount >= RATE_PER_DAY) {
    return json({ error: "rate_limit_day" }, 429);
  }
  if (dayTokens >= TOKENS_PER_DAY) {
    return json({ error: "token_budget_exceeded" }, 429);
  }

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!anthropicRes.ok) {
    // Log upstream detail server-side; return generic error to client.
    const detail = await anthropicRes.text();
    console.error("anthropic_error", anthropicRes.status, detail);
    return json({ error: "ai_upstream_error" }, 502);
  }

  const data = (await anthropicRes.json()) as {
    content?: Array<{ text?: string }>;
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  const content = data.content?.[0]?.text ?? "";
  const tokensUsed = (data.usage?.input_tokens ?? 0) + (data.usage?.output_tokens ?? 0);

  // Upsert usage for this (user, minute, day). Additive counters via manual upsert.
  const { error: upsertErr } = await admin.rpc("ai_usage_increment", {
    p_user_id: userId,
    p_minute_bucket: minuteBucket,
    p_day_bucket: dayBucket,
    p_tokens: tokensUsed,
  });
  if (upsertErr) {
    // Fallback: direct upsert (best effort, counters not strictly atomic)
    await admin.from("ai_usage").upsert(
      {
        user_id: userId,
        minute_bucket: minuteBucket,
        day_bucket: dayBucket,
        minute_count: minuteCount + 1,
        day_count: dayCount + 1,
        day_token_sum: dayTokens + tokensUsed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,minute_bucket,day_bucket" },
    );
  }

  return json({ content });
});
