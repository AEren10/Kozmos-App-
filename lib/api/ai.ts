/**
 * AI gateway — Supabase Edge Function `ai-complete` proxy'sini çağırır.
 * Client Anthropic key'i görmez; key Supabase'de secret olarak tutuluyor.
 *
 * AI_CONFIGURED false ise mock yanıtlar döner (geliştirme / test için).
 */

import { supabase, SUPABASE_ANON_KEY } from "@/lib/supabase";

const BASE = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";
const AI_ENABLED = process.env.EXPO_PUBLIC_AI_ENABLED === "true";

export const isAiConfigured = () => AI_ENABLED && Boolean(BASE);

export class AiError extends Error {
  readonly status: number;
  readonly code: string;
  constructor(status: number, code: string, message?: string) {
    super(message ?? code);
    this.status = status;
    this.code = code;
  }
}

export async function aiComplete(
  prompt: string,
  opts?: { system?: string; maxTokens?: number; model?: string },
): Promise<string> {
  if (!isAiConfigured()) {
    return "__MOCK__";
  }

  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    throw new AiError(401, "not_authenticated");
  }

  const res = await fetch(`${BASE}/ai-complete`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      authorization: `Bearer ${data.session.access_token}`,
    },
    body: JSON.stringify({
      prompt,
      system: opts?.system,
      maxTokens: opts?.maxTokens ?? 800,
      model: opts?.model,
    }),
  });

  if (!res.ok) {
    let code = "ai_error";
    try {
      const j = (await res.json()) as { error?: string };
      if (typeof j.error === "string") code = j.error;
    } catch {
      // ignore — body already consumed or not JSON
    }
    throw new AiError(res.status, code);
  }

  const payload = (await res.json()) as { content?: string };
  return payload.content ?? "";
}
