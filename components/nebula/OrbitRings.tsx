import { useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

export function OrbitRings({
  size = 200,
  color = "rgba(196,170,255,0.22)",
  count = 3,
}: {
  size?: number;
  color?: string;
  count?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: count }).map((_, i) => {
        const r = size / 2 - 4 - i * 18;
        return (
          <Circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={0.6}
            strokeDasharray={i % 2 ? "2 4" : undefined}
          />
        );
      })}
    </Svg>
  );
}

/**
 * kz-rotate — continuous rotator wrapper (Reanimated 3 worklet).
 */
export function Rotator({
  duration = 20000,
  reverse = false,
  children,
}: {
  duration?: number;
  reverse?: boolean;
  children: React.ReactNode;
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

  return <Animated.View style={style}>{children}</Animated.View>;
}
