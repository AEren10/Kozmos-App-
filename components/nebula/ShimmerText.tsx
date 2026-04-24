import { useEffect } from "react";
import { View, Text, type TextStyle, type StyleProp } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { palette } from "@/constants/designTokens";

/**
 * kz-shimmer — MaskedView + animated LinearGradient sweep.
 * A wide gradient bar translates across the text mask, creating a shimmer pass.
 */
export function ShimmerText({
  children,
  style,
  from = palette.accent,
  via = "#ffffff",
  to = palette.accent2,
  duration = 2400,
  width = 260,
}: {
  children: string;
  style?: StyleProp<TextStyle>;
  from?: string;
  via?: string;
  to?: string;
  duration?: number;
  width?: number;
}) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }, [duration, t]);

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -width + t.value * (width * 2) }],
  }));

  return (
    <MaskedView
      maskElement={
        <Text style={[style, { backgroundColor: "transparent", color: "#000" }]}>
          {children}
        </Text>
      }
    >
      <View style={{ position: "relative" }}>
        {/* Base solid-gradient fill so text is always visible. */}
        <LinearGradient
          colors={[from, to] as const}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ paddingHorizontal: 1 }}
        >
          <Text style={[style, { opacity: 0 }]}>{children}</Text>
        </LinearGradient>

        {/* Shimmer sweep overlay */}
        <Animated.View
          pointerEvents="none"
          style={[
            { position: "absolute", top: 0, bottom: 0, width },
            sweepStyle,
          ]}
        >
          <LinearGradient
            colors={["rgba(255,255,255,0)", via, "rgba(255,255,255,0)"] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>
    </MaskedView>
  );
}
