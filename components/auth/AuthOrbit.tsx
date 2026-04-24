import { View } from "react-native";
import { Orb, OrbitRings, Rotator, OrbitingDot } from "@/components/nebula";

export function AuthOrbit() {
  return (
    <>
      <View style={{ position: "absolute", width: 200, height: 200, alignItems: "center", justifyContent: "center" }}>
        <Rotator duration={18000}>
          <OrbitRings size={200} color="rgba(196,170,255,0.25)" count={1} />
        </Rotator>
        <OrbitingDot radius={95} size={6} color="#ff9ad1" duration={18000} />
      </View>
      <View style={{ position: "absolute", width: 180, height: 180, alignItems: "center", justifyContent: "center" }}>
        <Rotator duration={12000} reverse>
          <OrbitRings size={180} color="rgba(255,154,209,0.2)" count={1} />
        </Rotator>
        <OrbitingDot radius={85} size={5} color="#c4a4ff" duration={12000} reverse />
      </View>
      <Orb size={160} />
    </>
  );
}
