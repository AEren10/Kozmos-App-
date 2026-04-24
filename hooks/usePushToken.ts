import { useEffect } from "react";
import { useAppSelector } from "@/store";
import { registerForPush } from "@/lib/notifications";

export function usePushBootstrap() {
  const userId = useAppSelector((s) => s.auth.userId);

  useEffect(() => {
    if (!userId) return;
    registerForPush(userId).catch(() => {});
  }, [userId]);
}
