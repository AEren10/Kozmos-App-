import { useEffect, useRef } from "react";
import { Animated, View, Easing } from "react-native";

function Dot({ delay, color }: { delay: number; color: string }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: 1.08, duration: 600, delay, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 600, delay, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.6, duration: 600, useNativeDriver: true }),
        ]),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [delay, opacity, scale]);

  return (
    <Animated.View
      style={{
        width: 5,
        height: 5,
        borderRadius: 99,
        backgroundColor: color,
        transform: [{ scale }],
        opacity,
      }}
    />
  );
}

export function TypingDots({ color = "#ff9ad1" }: { color?: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Dot delay={0} color={color} />
      <Dot delay={180} color={color} />
      <Dot delay={360} color={color} />
    </View>
  );
}
