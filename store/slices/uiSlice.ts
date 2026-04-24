import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  theme: "dark" | "light";
  lang: "tr" | "en";
  lastToast: { id: string; text: string; type: "info" | "success" | "error" } | null;
};

const initial: UIState = { theme: "dark", lang: "tr", lastToast: null };

const slice = createSlice({
  name: "ui",
  initialState: initial,
  reducers: {
    setTheme(state, action: PayloadAction<UIState["theme"]>) {
      state.theme = action.payload;
    },
    setLang(state, action: PayloadAction<UIState["lang"]>) {
      state.lang = action.payload;
    },
    toast(state, action: PayloadAction<{ text: string; type?: "info" | "success" | "error" }>) {
      state.lastToast = { id: Date.now().toString(), text: action.payload.text, type: action.payload.type ?? "info" };
    },
  },
});

export const { setTheme, setLang, toast } = slice.actions;
export default slice.reducer;
