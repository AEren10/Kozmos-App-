import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StreakState = {
  current: number;
  longest: number;
  lastVisit: string | null;
  onboardingSeen: boolean;
  paywallSeen: boolean;
};

const initial: StreakState = { current: 0, longest: 0, lastVisit: null, onboardingSeen: false, paywallSeen: false };

const slice = createSlice({
  name: "streak",
  initialState: initial,
  reducers: {
    markVisit(state, action: PayloadAction<string>) {
      const today = action.payload;
      if (state.lastVisit === today) return;
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      const yesterday = y.toISOString().split("T")[0];
      if (state.lastVisit === yesterday) state.current += 1;
      else state.current = 1;
      state.longest = Math.max(state.longest, state.current);
      state.lastVisit = today;
    },
    setOnboardingSeen(state, a: PayloadAction<boolean>) {
      state.onboardingSeen = a.payload;
    },
    setPaywallSeen(state, a: PayloadAction<boolean>) {
      state.paywallSeen = a.payload;
    },
    resetStreak(state) {
      state.current = 0;
      state.longest = 0;
      state.lastVisit = null;
    },
  },
});

export const { markVisit, setOnboardingSeen, setPaywallSeen, resetStreak } = slice.actions;
export default slice.reducer;
