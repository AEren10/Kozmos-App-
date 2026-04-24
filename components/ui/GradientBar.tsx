import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, Easing } from "react-native-reanimated";
import { useEffect } from "react";

type Props = {
  value: number; // 0..100
  colors?: readonly [string, string, ...string[]];
  height?: number;
  trackColor?: string;
  delay?: number;
  animate?: boolean;
};

// Gradient horizontal progress bar. Used for birth progress + daily energy meters.
export function GradientBar({
  value,
  colors = ["#C8A4FF", "#FF8FB5"] as const,
  height = 6,
  trackColor = "rgba(255,255,255,0.08)",
  delay = 0,
  animate = true,
}: Props) {
  const pct = useSharedValue(animate ? 0 : value);
  useEffect(() => {
    if (animate) {
      pct.value = withDelay(delay, withTiming(value, { duration: 900, easing: Easing.out(Easing.cubic) }));
    } else {
      pct.value = value;
    }
  }, [value, delay, animate, pct]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${pct.value}%` }));

  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: trackColor, overflow: "hidden" }}>
      <Animated.View style={[{ height: "100%", borderRadius: height / 2 }, fillStyle]}>
        <LinearGradient
          colors={colors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, borderRadius: height / 2 }}
        />
      </Animated.View>
    </View>
  );
}
