import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { NebulaTabBar } from "@/components/nav/NebulaTabBar";

export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <NebulaTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: t("tabs.today") }} />
      <Tabs.Screen name="natal" options={{ title: t("tabs.natal") }} />
      <Tabs.Screen name="compat" options={{ title: t("tabs.compat") }} />
      <Tabs.Screen name="tools" options={{ title: t("tabs.tools") }} />
      <Tabs.Screen name="settings" options={{ title: t("tabs.settings") }} />
    </Tabs>
  );
}
