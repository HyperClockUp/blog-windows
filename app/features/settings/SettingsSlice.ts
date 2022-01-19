// process center, to manager all process here
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  backgroundImage?: string;
  showWindowsMenu: boolean;
}

const initialSettingsState: SettingsState = {
  showWindowsMenu: false,
};

export const settingsSlice = createSlice({
  name: "system",
  initialState: initialSettingsState,
  reducers: {
    setBackgroundImage(state, action: PayloadAction<string>) {
      state.backgroundImage = action.payload;
    },
    setShowWindowsMenu(state, action: PayloadAction<boolean>) {
      state.showWindowsMenu = action.payload;
    },
  },
});

export const { setBackgroundImage, setShowWindowsMenu } = settingsSlice.actions;

export default settingsSlice.reducer;
