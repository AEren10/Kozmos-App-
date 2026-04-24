import { useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { colors, fonts } from "@/constants/theme";

type Props = {
  value: Date | null;
  onChange: (d: Date) => void;
};

const MONTHS_TR = ["OCA", "ŞUB", "MAR", "NİS", "MAY", "HAZ", "TEM", "AĞU", "EYL", "EKI", "KAS", "ARA"];
const WEEK_TR = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];

// Pixel-close custom calendar matching design handoff (birth step 4).
export function BirthCalendarStep({ value, onChange }: Props) {
  const today = new Date();
  const initial = value ?? new Date(1996, 0, 14);
  const [year, setYear] = useState<number>(initial.getFullYear());
  const [month, setMonth] = useState<number>(initial.getMonth());

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const firstDay = useMemo(() => {
    // JS: 0=Sun. Design starts with Pz (Sun) first.
    const d = new Date(year, month, 1).getDay();
    return d;
  }, [year, month]);

  const selected = value ?? null;

  const pickDay = (day: number) => {
    const d = new Date(year, month, day);
    onChange(d);
  };

  const years = useMemo(() => {
    const now = today.getFullYear();
    const arr: number[] = [];
    for (let y = now; y >= now - 100; y--) arr.push(y);
    return arr;
  }, [today]);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, paddingRight: 8 }}
          style={{ flex: 1 }}
        >
          {MONTHS_TR.map((m, i) => (
            <Pressable key={m} onPress={() => setMonth(i)} style={[styles.monthChip, i === month && styles.monthChipActive]}>
              <Text style={[styles.monthText, i === month && styles.monthTextActive]}>{m}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <YearChip year={year} years={years} onPick={setYear} />
      </View>

      <View style={styles.weekHeader}>
        {WEEK_TR.map((w) => (
          <Text key={w} style={styles.weekText}>{w}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {Array.from({ length: firstDay }).map((_, i) => (
          <View key={`e-${i}`} style={styles.cell} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isSelected =
            selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === day;
          return (
            <Pressable key={day} onPress={() => pickDay(day)} style={[styles.cell, isSelected && styles.cellActive]}>
              <Text style={[styles.dayText, isSelected && styles.dayTextActive]}>{day}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function YearChip({ year, years, onPick }: { year: number; years: number[]; onPick: (y: number) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Pressable onPress={() => setOpen((o) => !o)} style={styles.yearChip}>
        <Text style={styles.yearText}>{year}</Text>
      </Pressable>
      {open && (
        <View style={styles.yearDrop}>
          <ScrollView style={{ maxHeight: 180 }}>
            {years.map((y) => (
              <Pressable key={y} onPress={() => { onPick(y); setOpen(false); }} style={styles.yearItem}>
                <Text style={{ color: y === year ? colors.accent2 : colors.text, fontSize: 13 }}>{y}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.15)",
    borderRadius: 22,
    padding: 14,
  },
  topRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  monthChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.12)",
  },
  monthChipActive: {
    backgroundColor: "rgba(196,170,255,0.18)",
    borderColor: "rgba(196,170,255,0.45)",
  },
  monthText: { fontSize: 11, fontFamily: fonts.mono, color: colors.textDim, letterSpacing: 1 },
  monthTextActive: { color: "#fff" },
  yearChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#ff9ad1",
  },
  yearText: { fontSize: 13, fontFamily: fonts.bodyBold, color: "#1a0e3d" },
  yearDrop: {
    position: "absolute",
    top: 34,
    right: 0,
    backgroundColor: "#1a0e3d",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(196,170,255,0.25)",
    minWidth: 90,
    zIndex: 20,
    padding: 4,
  },
  yearItem: { paddingHorizontal: 10, paddingVertical: 7 },
  weekHeader: {
    flexDirection: "row",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(196,170,255,0.15)",
    marginBottom: 4,
  },
  weekText: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    fontFamily: fonts.mono,
    color: colors.textMute,
    letterSpacing: 1,
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1.05,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  cellActive: {
    backgroundColor: "#ff9ad1",
  },
  dayText: { fontSize: 13, color: colors.textDim, fontFamily: fonts.body },
  dayTextActive: { color: "#1a0e3d", fontFamily: fonts.bodyBold },
});
