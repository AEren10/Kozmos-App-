import { useEffect } from "react";
import type { ViewStyle, StyleProp } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

/**
 * kz-glow — soft pulsing halo for CTAs. Wraps children; the halo is the child box-shadow itself.
 */
export function GlowHalo({
  color = "#c4a4ff",
  minRadius = 30,
  maxRadius = 60,
  duration = 3000,
  children,
  style,
}: {
  color?: string;
  minRadius?: number;
  maxRadius?: number;
  duration?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [duration, t]);

  const animStyle = useAnimatedStyle(() => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3 + t.value * 0.3,
    shadowRadius: minRadius + t.value * (maxRadius - minRadius),
  }));

  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
}
