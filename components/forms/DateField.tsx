import { useState } from "react";
import { View, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "@/components/ui/Input";
import { Caption } from "@/components/ui/Heading";
import { colors } from "@/constants/theme";

type Props = {
  label: string;
  mode: "date" | "time";
  value: Date | null;
  onChange: (d: Date) => void;
};

export function DateField({ label, mode, value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const display = value
    ? mode === "date"
      ? value.toISOString().split("T")[0]
      : value.toTimeString().slice(0, 5)
    : "";

  if (Platform.OS === "web") {
    return (
      <Input
        label={label}
        value={display}
        onChangeText={(t) => {
          const d = new Date(t);
          if (!isNaN(d.getTime())) onChange(d);
        }}
        placeholder={mode === "date" ? "1999-07-23" : "08:30"}
      />
    );
  }

  return (
    <View style={{ marginBottom: 14 }}>
      <Caption style={{ marginBottom: 6 }}>{label}</Caption>
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          backgroundColor: colors.bgCard,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 14,
        }}
      >
        <Caption style={{ color: display ? colors.text : colors.textMute, fontSize: 16 }}>
          {display || (mode === "date" ? "Tarih seç" : "Saat seç")}
        </Caption>
      </Pressable>

      {open && (
        <DateTimePicker
          value={value ?? new Date(1999, 0, 1)}
          mode={mode}
          display={Platform.OS === "ios" ? "inline" : "default"}
          maximumDate={mode === "date" ? new Date() : undefined}
          onChange={(_event, d) => {
            setOpen(Platform.OS === "ios");
            if (d) onChange(d);
          }}
        />
      )}
    </View>
  );
}
