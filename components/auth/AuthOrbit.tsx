import { View } from "react-native";
import { Orb, OrbitRings, Rotator, OrbitingDot } from "@/components/nebula";

export function AuthOrbit() {
  return (
    <>
      <View style={{ position: "absolute", width: 210, height: 210, alignItems: "center", justifyContent: "center" }}>
        <Rotator duration={18000}>
          <OrbitRings size={210} color="rgba(196,170,255,0.2)" count={1} />
        </Rotator>
        <OrbitingDot radius={100} size={6} color="#d8c4ff" duration={18000} />
      </View>

      <View style={{ position: "absolute", width: 250, height: 250, alignItems: "center", justifyContent: "center", opacity: 0.45 }}>
        <Rotator duration={12000} reverse>
          <OrbitRings size={250} color="rgba(255,255,255,0.12)" count={1} />
        </Rotator>
      </View>

      <View style={{ position: "absolute", width: 180, height: 180, alignItems: "center", justifyContent: "center", opacity: 0.7 }}>
        <Rotator duration={12000} reverse>
          <OrbitRings size={180} color="rgba(255,154,209,0.14)" count={1} />
        </Rotator>
        <OrbitingDot radius={85} size={5} color="#c4a4ff" duration={12000} reverse />
      </View>

      <Orb size={132} floatAmplitude={8} floatDuration={5400} colorsOverride={["#ffffff", "#dcc9ff", "#925df4"]} />
    </>
  );
}
