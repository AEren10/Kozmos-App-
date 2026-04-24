import { useFonts as useExpoFonts } from "expo-font";

export function useFonts() {
  return useExpoFonts({
    Fraunces_300Light_Italic: require("@expo-google-fonts/fraunces/300Light_Italic/Fraunces_300Light_Italic.ttf"),
    Fraunces_400Regular_Italic: require("@expo-google-fonts/fraunces/400Regular_Italic/Fraunces_400Regular_Italic.ttf"),
    Fraunces_600SemiBold: require("@expo-google-fonts/fraunces/600SemiBold/Fraunces_600SemiBold.ttf"),
    Inter_400Regular: require("@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf"),
    Inter_500Medium: require("@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf"),
    Inter_700Bold: require("@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf"),
    JetBrainsMono_400Regular: require("@expo-google-fonts/jetbrains-mono/400Regular/JetBrainsMono_400Regular.ttf"),
    JetBrainsMono_500Medium: require("@expo-google-fonts/jetbrains-mono/500Medium/JetBrainsMono_500Medium.ttf"),
  });
}
