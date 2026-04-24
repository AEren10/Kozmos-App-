import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

/**
 * kz-orbit — point traces circular orbit of given radius.
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
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          width: radius * 2,
          height: radius * 2,
          alignItems: "center",
        },
        style,
      ]}
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
