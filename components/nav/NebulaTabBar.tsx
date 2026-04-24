import { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { palette, fontFamilies, gradients } from "@/constants/designTokens";

const TAB_GLYPHS: Record<string, string> = {
  index: "☉",
  natal: "◎",
  compat: "♀",
  tools: "✦",
  settings: "⊕",
  profile: "⊕",
};

const BAR_HEIGHT = 72;
const INDICATOR_WIDTH = 32;

/**
 * Custom Nebula-themed tab bar: pill indicator spring-animates to active tab,
 * with a glowing halo on the active icon pill.
 */
export function NebulaTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // Filter hidden routes (tabBarButton: () => null or href: null)
  const visibleRoutes = state.routes.filter((route) => {
    const { options } = descriptors[route.key] ?? { options: {} as any };
    const o = options as any;
    if (o?.href === null) return false;
    if (o?.tabBarButton === null) return false;
    return true;
  });

  const tabCount = visibleRoutes.length || 1;
  const activeIndexInVisible = Math.max(
    0,
    visibleRoutes.findIndex((r) => state.routes[state.index]?.key === r.key),
  );

  const indicatorX = useSharedValue(activeIndexInVisible);

  useEffect(() => {
    indicatorX.value = withSpring(activeIndexInVisible, { damping: 18, stiffness: 180 });
  }, [activeIndexInVisible, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => {
    const pct = (indicatorX.value + 0.5) / tabCount; // center of slot
    return {
      left: `${pct * 100}%`,
      transform: [{ translateX: -INDICATOR_WIDTH / 2 }],
    };
  });

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.overlay} />

      {/* Pill indicator at top */}
      <Animated.View style={[styles.indicatorWrap, indicatorStyle]} pointerEvents="none">
        <LinearGradient
          colors={gradients.cta as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.indicator}
        />
      </Animated.View>

      <View style={styles.row}>
        {visibleRoutes.map((route, i) => {
          const { options } = descriptors[route.key];
          const isFocused = state.routes[state.index]?.key === route.key;
          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : options.title ?? route.name;
          const glyph = TAB_GLYPHS[route.name] ?? "✦";

          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (navigation as any).navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tab}
            >
              <TabIcon glyph={glyph} focused={isFocused} />
              <Text
                style={[
                  styles.label,
                  { color: isFocused ? palette.accent : palette.textMute },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function TabIcon({ glyph, focused }: { glyph: string; focused: boolean }) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (!focused) {
      pulse.value = 0;
      return;
    }
    pulse.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [focused, pulse]);

  const haloStyle = useAnimatedStyle(() => ({
    opacity: focused ? 0.4 + pulse.value * 0.4 : 0,
    shadowOpacity: focused ? 0.4 + pulse.value * 0.4 : 0,
  }));

  return (
    <View style={iconStyles.wrap}>
      {/* Glow halo (active only) */}
      <Animated.View
        pointerEvents="none"
        style={[
          iconStyles.halo,
          haloStyle,
          { shadowColor: palette.accent },
        ]}
      />
      {focused ? (
        <LinearGradient
          colors={["rgba(196,170,255,0.25)", "rgba(139,92,246,0.2)"] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[iconStyles.pill, iconStyles.pillActive]}
        >
          <Text style={[iconStyles.glyph, { color: palette.accent }]}>{glyph}</Text>
        </LinearGradient>
      ) : (
        <View style={iconStyles.pill}>
          <Text style={[iconStyles.glyph, { color: palette.textMute }]}>{glyph}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: BAR_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: "rgba(196,170,255,0.15)",
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13,8,32,0.92)",
  },
  indicatorWrap: {
    position: "absolute",
    top: 0,
    width: INDICATOR_WIDTH,
    height: 3,
  },
  indicator: {
    flex: 1,
    borderRadius: 99,
    shadowColor: palette.accent,
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  label: {
    fontSize: 10,
    fontFamily: fontFamilies.mono,
    letterSpacing: 0.5,
  },
});

const iconStyles = StyleSheet.create({
  wrap: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
  },
  pill: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  pillActive: {
    borderColor: "rgba(196,170,255,0.3)",
  },
  glyph: {
    fontSize: 18,
  },
});
