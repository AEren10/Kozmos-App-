import { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { useAppSelector, useAppDispatch } from "@/store";
import { toast as toastAction } from "@/store/slices/uiSlice";
import { colors } from "@/constants/theme";

export function ToastHost() {
  const toast = useAppSelector((s) => s.ui.lastToast);
  const dispatch = useAppDispatch();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (!toast) return;
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();

    const t = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -20, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        dispatch(toastAction({ text: "" }));
      });
    }, 2500);

    return () => clearTimeout(t);
  }, [toast?.id]);

  if (!toast || !toast.text) return null;

  const borderColor =
    toast.type === "success" ? colors.success : toast.type === "error" ? colors.danger : colors.accent;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.wrap, { opacity, transform: [{ translateY }], borderColor }]}
    >
      <Text style={styles.text}>{toast.text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  text: { color: colors.text, fontSize: 14, fontWeight: "500" },
});
