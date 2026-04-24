import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
};

const initial: AuthState = { userId: null, email: null, isAuthenticated: false, isHydrated: false };

const slice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    signedIn(state, action: PayloadAction<{ userId: string; email: string | null }>) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    signedOut(state) {
      state.userId = null;
      state.email = null;
      state.isAuthenticated = false;
    },
    hydrated(state) {
      state.isHydrated = true;
    },
  },
});

export const { signedIn, signedOut, hydrated } = slice.actions;
export default slice.reducer;
