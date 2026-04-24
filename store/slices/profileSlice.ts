import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "@/types";

type ProfileState = {
  profile: Profile | null;
  onboardingComplete: boolean;
  remoteSynced: boolean;
};

const initial: ProfileState = { profile: null, onboardingComplete: false, remoteSynced: false };

const slice = createSlice({
  name: "profile",
  initialState: initial,
  reducers: {
    setProfile(state, action: PayloadAction<Profile | null>) {
      state.profile = action.payload;
      state.onboardingComplete = Boolean(action.payload?.birth_date);
      state.remoteSynced = true;
    },
    clearProfile(state) {
      state.profile = null;
      state.onboardingComplete = false;
      state.remoteSynced = false;
    },
    setOnboardingComplete(state, action: PayloadAction<boolean>) {
      state.onboardingComplete = action.payload;
    },
    markProfileSynced(state) {
      state.remoteSynced = true;
    },
  },
});

export const { setProfile, clearProfile, setOnboardingComplete, markProfileSynced } = slice.actions;
export default slice.reducer;
