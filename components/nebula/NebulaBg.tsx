import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Starfield } from "./Starfield";

export function NebulaBg({ seed = 1 }: { seed?: number }) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["#3a1d6e", "#1a0e3d", "#0d0820"]}
        locations={[0, 0.4, 0.8]}
        style={StyleSheet.absoluteFill}
      />
      {/* Soft nebula blobs (simulated with radial-like translucent circles) */}
      <View
        style={{
          position: "absolute",
          top: "15%",
          left: "-25%",
          width: 380,
          height: 380,
          borderRadius: 190,
          backgroundColor: "rgba(196,170,255,0.22)",
          opacity: 0.6,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-20%",
          width: 340,
          height: 340,
          borderRadius: 170,
          backgroundColor: "rgba(255,154,209,0.18)",
          opacity: 0.6,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: "55%",
          left: "40%",
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: "rgba(120,180,255,0.15)",
          opacity: 0.6,
        }}
      />
      <Starfield seed={seed} count={80} />
    </View>
  );
}
