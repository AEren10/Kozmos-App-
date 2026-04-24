import { useMemo, useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function Star({ x, y, size, opacity, duration, delay }: any) {
  const anim = useRef(new Animated.Value(opacity)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: duration * 500, delay, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.2, duration: duration * 500, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#fff",
        opacity: anim,
      }}
    />
  );
}

export function Starfield({ count = 80, seed = 1 }: { count?: number; seed?: number }) {
  const stars = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, () => ({
      x: r() * 100,
      y: r() * 100,
      size: r() * 2 + 0.6,
      opacity: r() * 0.7 + 0.3,
      duration: r() * 4 + 2,
      delay: r() * 2000,
    }));
  }, [count, seed]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {stars.map((s, i) => (
        <Star key={i} {...s} />
      ))}
    </View>
  );
}
