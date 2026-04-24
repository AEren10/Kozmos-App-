import { useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { signedIn, signedOut, hydrated } from "@/store/slices/authSlice";
import { setProfile, clearProfile, markProfileSynced } from "@/store/slices/profileSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProfile } from "@/lib/api/users";

export function useAuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      dispatch(hydrated());
      return;
    }
    let cancelled = false;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      if (session?.user) {
        dispatch(signedIn({ userId: session.user.id, email: session.user.email ?? null }));
        try {
          const p = await fetchProfile(session.user.id);
          if (!cancelled) dispatch(setProfile(p));
        } catch {
          if (!cancelled) dispatch(markProfileSynced());
        }
      }
      if (!cancelled) dispatch(hydrated());
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        dispatch(signedIn({ userId: session.user.id, email: session.user.email ?? null }));
        try {
          const p = await fetchProfile(session.user.id);
          dispatch(setProfile(p));
        } catch {
          dispatch(markProfileSynced());
        }
      } else {
        dispatch(signedOut());
        dispatch(clearProfile());
      }
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);
}

export function useAuth() {
  return useAppSelector((s) => s.auth);
}

export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signUpWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
}
