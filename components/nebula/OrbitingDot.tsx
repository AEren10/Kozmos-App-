import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

/**
 * Ring üzerinde dönen nokta — tasarımdaki kz-orbit animasyonu.
 * radius = yarıçap; size = nokta boyutu; duration = tam tur süresi
 */
export function OrbitingDot({
  radius,
  size = 4,
  color = "#ff9ad1",
  duration = 12000,
  reverse = false,
  glow = true,
}: {
  radius: number;
  size?: number;
  color?: string;
  duration?: number;
  reverse?: boolean;
  glow?: boolean;
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
    outputRange: reverse ? ["360deg", "0deg"] : ["0deg", "360deg"],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        width: radius * 2,
        height: radius * 2,
        alignItems: "center",
        transform: [{ rotate: spin }],
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOpacity: glow ? 0.8 : 0,
          shadowRadius: 10,
          elevation: 6,
        }}
      />
    </Animated.View>
  );
}
