import { TextInput, View, Text, type TextInputProps, type StyleProp, type ViewStyle, type TextStyle } from "react-native";
import { colors, radii, fonts } from "@/constants/theme";

export function Input({
  label,
  error,
  icon,
  style,
  containerStyle,
  inputStyle,
  ...rest
}: TextInputProps & {
  label?: string;
  error?: string | null;
  icon?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      {label ? (
        <Text
          style={{
            color: colors.textDim,
            fontSize: 11,
            marginBottom: 6,
            fontFamily: fonts.mono,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Text>
      ) : null}

      <View
        style={[
          {
            minHeight: 56,
            borderRadius: 18,
            backgroundColor: "rgba(28,18,56,0.68)",
            borderWidth: 1,
            borderColor: error ? colors.danger : "rgba(196,170,255,0.18)",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            gap: 10,
            shadowColor: "#000",
            shadowOpacity: 0.22,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 12 },
          },
          containerStyle,
        ]}
      >
        {icon ? <Text style={{ color: "rgba(196,170,255,0.88)", fontSize: 14 }}>{icon}</Text> : null}
        <TextInput
          placeholderTextColor={colors.textMute}
          style={[
            {
              flex: 1,
              color: colors.text,
              fontSize: 15,
              fontFamily: fonts.body,
            },
            inputStyle as any,
            style as any,
          ]}
          {...rest}
        />
      </View>

      {error ? (
        <Text style={{ color: colors.danger, fontSize: 12, marginTop: 4 }}>{error}</Text>
      ) : null}
    </View>
  );
}
