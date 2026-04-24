import { TextInput, View, Text, type TextInputProps } from "react-native";
import { colors, radii, fonts } from "@/constants/theme";

export function Input({
  label,
  error,
  icon,
  style,
  ...rest
}: TextInputProps & { label?: string; error?: string | null; icon?: string }) {
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
        style={{
          height: 54,
          borderRadius: radii.md,
          backgroundColor: colors.surfaceGlass,
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.border,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          gap: 10,
        }}
      >
        {icon ? <Text style={{ color: colors.accent, fontSize: 16 }}>{icon}</Text> : null}
        <TextInput
          placeholderTextColor={colors.textMute}
          style={[
            {
              flex: 1,
              color: colors.text,
              fontSize: 15,
              fontFamily: fonts.body,
            },
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
