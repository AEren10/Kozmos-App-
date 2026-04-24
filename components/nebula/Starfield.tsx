import { useMemo } from "react";
import { View, StyleSheet, type DimensionValue } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type StarProps = {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  duration: number;
  delay: number;
  color: string;
};

function Star({ x, y, size, baseOpacity, duration, delay, color }: StarProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      ),
    );
  }, [delay, duration, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: 0.2 + (1 - 0.2) * progress.value * baseOpacity + baseOpacity * 0.1,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          left: (`${x}%` as DimensionValue),
          top: (`${y}%` as DimensionValue),
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

export function Starfield({
  count = 80,
  seed = 1,
  color = "#ffffff",
}: {
  count?: number;
  seed?: number;
  color?: string;
}) {
  const stars = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, () => ({
      x: r() * 100,
      y: r() * 100,
      size: r() * 2 + 0.6,
      baseOpacity: r() * 0.7 + 0.3,
      duration: (r() * 4 + 2) * 1000,
      delay: r() * 4000,
    }));
  }, [count, seed]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((s, i) => (
        <Star key={i} {...s} color={color} />
      ))}
    </View>
  );
}

// Alias for primitives barrel — matches handoff name.
export { Starfield as StarField };
