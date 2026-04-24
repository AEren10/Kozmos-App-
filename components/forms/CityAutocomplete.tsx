import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Input } from "@/components/ui/Input";
import { geocodeCity } from "@/lib/geocode";
import { colors } from "@/constants/theme";

type Props = {
  label: string;
  value: string;
  onSelect: (v: { name: string; lat: number; lon: number }) => void;
};

export function CityAutocomplete({ label, value, onSelect }: Props) {
  const [text, setText] = useState(value);
  const [hits, setHits] = useState<{ name: string; lat: number; lon: number }[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (text.length < 2) {
      setHits([]);
      return;
    }
    const id = setTimeout(async () => {
      const r = await geocodeCity(text);
      setHits(r);
      setOpen(true);
    }, 400);
    return () => clearTimeout(id);
  }, [text]);

  return (
    <View>
      <Input label={label} value={text} onChangeText={setText} autoCapitalize="words" />
      {open && hits.length > 0 && (
        <View style={{ backgroundColor: colors.bgCard, borderRadius: 12, borderWidth: 1, borderColor: colors.border, marginTop: -8, marginBottom: 12, maxHeight: 180 }}>
          <FlatList
            data={hits}
            keyExtractor={(i) => `${i.lat}-${i.lon}`}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setText(item.name);
                  onSelect(item);
                  setOpen(false);
                }}
                style={({ pressed }) => ({
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text style={{ color: colors.text, fontSize: 14 }}>{item.name}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}
