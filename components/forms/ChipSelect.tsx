import { View, Pressable, Text } from "react-native";
import { colors } from "@/constants/theme";

type Option = { key: string; label: string; emoji?: string };

export function ChipSelect({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: Option[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multi?: boolean;
}) {
  const isSelected = (k: string) => (multi ? (value as string[]).includes(k) : value === k);

  const toggle = (k: string) => {
    if (multi) {
      const arr = value as string[];
      if (arr.includes(k)) onChange(arr.filter((x) => x !== k));
      else onChange([...arr, k]);
    } else {
      onChange(k);
    }
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
      {options.map((o) => {
        const sel = isSelected(o.key);
        return (
          <Pressable
            key={o.key}
            onPress={() => toggle(o.key)}
            style={({ pressed }) => ({
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 999,
              backgroundColor: sel ? colors.accentSoft : colors.bgCard,
              borderWidth: 1,
              borderColor: sel ? colors.accent : colors.border,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ color: sel ? colors.text : colors.textSoft, fontSize: 14, fontWeight: sel ? "600" : "400" }}>
              {o.emoji ? `${o.emoji}  ` : ""}{o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
