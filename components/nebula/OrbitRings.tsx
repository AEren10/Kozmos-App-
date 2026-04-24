import Svg, { Circle } from "react-native-svg";
import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

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
 * Rotating wrapper — OrbitRings içinde sürekli döner
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
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [duration, rotate]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? ["0deg", "-360deg"] : ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>{children}</Animated.View>
  );
}
