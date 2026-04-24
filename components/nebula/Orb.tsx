import { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function Orb({
  size = 76,
  floatAmplitude = 6,
  floatDuration = 5000,
  glow = true,
}: {
  size?: number;
  floatAmplitude?: number;
  floatDuration?: number;
  glow?: boolean;
}) {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: -floatAmplitude, duration: floatDuration / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: floatDuration / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    ).start();
  }, [floatAmplitude, floatDuration, y]);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        transform: [{ translateY: y }],
        shadowColor: "#c4a4ff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: glow ? 0.7 : 0,
        shadowRadius: 30,
        elevation: glow ? 20 : 0,
      }}
    >
      <LinearGradient
        colors={["#ffffff", "#c4a4ff", "#5b2ea6"]}
        start={{ x: 0.3, y: 0.25 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
}

export function OrbitRing({
  size = 200,
  duration = 18000,
  reverse = false,
  children,
}: {
  size?: number;
  duration?: number;
  reverse?: boolean;
  children?: React.ReactNode;
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
    <Animated.View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotate: spin }],
      }}
    >
      {children}
    </Animated.View>
  );
}
