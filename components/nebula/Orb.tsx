import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { palette, shadows, gradients } from "@/constants/designTokens";

/**
 * kz-float — orb bobs vertically.
 */
export function Orb({
  size = 76,
  floatAmplitude = 6,
  floatDuration = 5000,
  glow = true,
  colorsOverride,
}: {
  size?: number;
  floatAmplitude?: number;
  floatDuration?: number;
  glow?: boolean;
  colorsOverride?: readonly [string, string, ...string[]];
}) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: floatDuration, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [floatDuration, t]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: -t.value * floatAmplitude }],
  }));

  const cols = (colorsOverride ?? gradients.orb) as readonly [string, string, ...string[]];

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: "hidden",
        },
        glow ? (shadows.orb as any) : undefined,
        style,
      ]}
    >
      <LinearGradient
        colors={cols as any}
        start={{ x: 0.3, y: 0.25 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
}

/**
 * kz-rotate / kz-rotate-rev — continuous rotation wrapper.
 */
export function OrbitRing({
  size = 200,
  duration = 18000,
  reverse = false,
  children,
}: {
  size?: number;
  duration?: number;
  reverse?: boolean;
  children?: React.ReactNode;
}) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }, [duration, t]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${(reverse ? -1 : 1) * t.value * 360}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {children ?? <View />}
    </Animated.View>
  );
}

// Legacy alias — colors-only import kept so existing imports work.
void palette;
