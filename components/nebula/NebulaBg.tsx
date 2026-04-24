import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Starfield } from "./Starfield";

export function NebulaBg({ seed = 1 }: { seed?: number }) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["#351763", "#22114c", "#120824", "#090513"]}
        locations={[0, 0.34, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.08)", "transparent"] as any}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.35 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          position: "absolute",
          top: "8%",
          right: "-24%",
          width: 320,
          height: 320,
          borderRadius: 160,
          backgroundColor: "rgba(196,170,255,0.18)",
          opacity: 0.95,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: "10%",
          right: "-12%",
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: "rgba(255,255,255,0.09)",
          opacity: 0.95,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: "18%",
          left: "-26%",
          width: 260,
          height: 260,
          borderRadius: 130,
          backgroundColor: "rgba(196,170,255,0.12)",
          opacity: 0.7,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: "-18%",
          left: "-8%",
          width: 300,
          height: 300,
          borderRadius: 150,
          backgroundColor: "rgba(255,154,209,0.12)",
          opacity: 0.55,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: 260,
          height: 260,
          borderRadius: 130,
          backgroundColor: "rgba(80,36,160,0.25)",
          opacity: 0.7,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "34%",
          backgroundColor: "rgba(4,2,12,0.2)",
        }}
      />
      <Starfield seed={seed} count={80} />
    </View>
  );
}
