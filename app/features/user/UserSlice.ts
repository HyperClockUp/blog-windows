// process center, to manager all process here
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  isLogin: boolean;
}


const initialUserState: UserState = {
  isLogin: localStorage.getItem('token') ? true : false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    login(state) {
      state.isLogin = true;
      localStorage.setItem('token', 'token');
      console.log(state.isLogin);
    },
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem('token');
    }
  }
});

export const {
  login,
  logout,
} = userSlice.actions;

export default userSlice.reducer;