import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

function Dot({ delay, color }: { delay: number; color: string }) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      ),
    );
  }, [delay, t]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + t.value * 0.08 }],
    opacity: 0.6 + t.value * 0.4,
  }));

  return (
    <Animated.View
      style={[
        {
          width: 5,
          height: 5,
          borderRadius: 99,
          backgroundColor: color,
        },
        style,
      ]}
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
