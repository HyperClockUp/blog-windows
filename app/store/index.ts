import userReducer from "./../features/user/UserSlice";
import settingsReducer from "../features/settings/SettingsSlice";
import coreReducer from '../features/core/CoreSlice';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    core: coreReducer,
    user: userReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
