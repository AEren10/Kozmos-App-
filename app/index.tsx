import { View } from "react-native";
import { colors } from "@/constants/theme";

// AuthGate (_layout.tsx) tek yönlendirme otoritesidir. Bu route hydration
// bitene kadar görünen geçici bir boş ekrandır; AuthGate hazır olunca
// router.replace ile gerçek hedefe geçilir.
export default function Index() {
  return <View style={{ flex: 1, backgroundColor: colors.bg }} />;
}
