import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";

import auth from "./slices/authSlice";
import profile from "./slices/profileSlice";
import ui from "./slices/uiSlice";
import streak from "./slices/streakSlice";

// auth slice stores only the minimal identity fields across restarts.
// `isAuthenticated` is derived from Supabase session at runtime, never persisted.
const persistedAuth = persistReducer(
  { key: "auth", storage: AsyncStorage, whitelist: ["userId", "email"] },
  auth,
);

const rootReducer = combineReducers({ auth: persistedAuth, profile, ui, streak });

const persisted = persistReducer(
  {
    key: "kozmos-root",
    version: 2,
    storage: AsyncStorage,
    whitelist: ["profile", "ui", "streak"],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persisted,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useReduxDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
