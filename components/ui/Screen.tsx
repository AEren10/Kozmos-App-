import { ScrollView, View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

export function Screen({
  children,
  scroll = true,
  padded = true,
  style,
  ...rest
}: ViewProps & { scroll?: boolean; padded?: boolean }) {
  const content = (
    <View style={[{ flex: 1, padding: padded ? 20 : 0 }, style as any]} {...rest}>
      {children}
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["top", "bottom"]}>
      {scroll ? <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}
