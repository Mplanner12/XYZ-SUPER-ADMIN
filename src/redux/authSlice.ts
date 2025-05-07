import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  name: string | null;
  email: string | null;
  userId: string | null;
  userToken: string | null;
}

export const INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  name: null,
  email: null,
  userId: null,
  userToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        userId: string;
        userToken: string;
      }>
    ) => {
      const { name, email, userId, userToken } = action.payload;
      state.isLoggedIn = true;
      state.name = name;
      state.email = email;
      state.userId = userId;
      state.userToken = userToken;
    },

    logout: () => INITIAL_STATE,
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
