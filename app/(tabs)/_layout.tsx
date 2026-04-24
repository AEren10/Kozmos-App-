import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { colors, fonts } from "@/constants/theme";

const TabIcon = ({ glyph, focused }: { glyph: string; focused: boolean }) => (
  <View
    style={{
      width: 38,
      height: 38,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: focused ? "rgba(196,170,255,0.22)" : "transparent",
      borderWidth: 1,
      borderColor: focused ? "rgba(196,170,255,0.3)" : "transparent",
    }}
  >
    <Text style={{ fontSize: 18, color: focused ? colors.accent : colors.textMute }}>{glyph}</Text>
  </View>
);

export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMute,
        tabBarStyle: {
          backgroundColor: "rgba(13,8,32,0.92)",
          borderTopColor: "rgba(196,170,255,0.15)",
          height: 84,
          paddingTop: 10,
          paddingBottom: 18,
        },
        tabBarLabelStyle: { fontSize: 10, fontFamily: fonts.mono, letterSpacing: 0.5, marginTop: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: t("tabs.today"), tabBarIcon: ({ focused }) => <TabIcon glyph="☉" focused={focused} /> }}
      />
      <Tabs.Screen
        name="natal"
        options={{ title: t("tabs.natal"), tabBarIcon: ({ focused }) => <TabIcon glyph="◎" focused={focused} /> }}
      />
      <Tabs.Screen
        name="compat"
        options={{ title: t("tabs.compat"), tabBarIcon: ({ focused }) => <TabIcon glyph="♀" focused={focused} /> }}
      />
      <Tabs.Screen
        name="tools"
        options={{ title: t("tabs.tools"), tabBarIcon: ({ focused }) => <TabIcon glyph="✦" focused={focused} /> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: t("tabs.settings"), tabBarIcon: ({ focused }) => <TabIcon glyph="⊕" focused={focused} /> }}
      />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
