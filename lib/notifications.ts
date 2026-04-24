import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestPushPermission(): Promise<boolean> {
  if (!Device.isDevice) return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (existing !== "granted") {
    const ask = await Notifications.requestPermissionsAsync();
    status = ask.status;
  }
  return status === "granted";
}

export async function registerForPush(userId: string): Promise<string | null> {
  const granted = await requestPushPermission();
  if (!granted) return null;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Kozmos",
      importance: Notifications.AndroidImportance.DEFAULT,
      lightColor: "#C8A4FF",
    });
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  if (isSupabaseConfigured() && token) {
    await supabase.from("push_tokens").upsert({
      user_id: userId,
      token,
      platform: Platform.OS,
      updated_at: new Date().toISOString(),
    });
  }
  return token;
}

export async function scheduleDailyReminder(hour = 8, minute = 0) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "✨ Kozmos",
      body: "Günün yıldız haritan hazır. Gel, bugünü birlikte oku.",
      data: { type: "daily" },
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute },
  });
}

export async function cancelReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
