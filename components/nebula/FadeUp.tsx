import { useEffect } from "react";
import type { ViewStyle, StyleProp } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

type Props = {
  delay?: number;
  duration?: number;
  offset?: number;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * kz-fade-up equivalent — Reanimated 3 worklet.
 */
export function FadeUp({ delay = 0, duration = 500, offset = 8, children, style }: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, duration, progress]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * offset }],
  }));

  return <Animated.View style={[animStyle, style]}>{children}</Animated.View>;
}
