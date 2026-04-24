import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function FadeUp({
  delay = 0,
  duration = 500,
  offset = 8,
  children,
  style,
}: {
  delay?: number;
  duration?: number;
  offset?: number;
  children: React.ReactNode;
  style?: any;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(offset)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, useNativeDriver: true }),
      Animated.timing(y, { toValue: 0, duration, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return <Animated.View style={[{ opacity, transform: [{ translateY: y }] }, style]}>{children}</Animated.View>;
}
