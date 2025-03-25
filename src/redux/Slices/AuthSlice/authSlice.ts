import { createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '@/components/interface/AuthInterface';

export const INITIAL_STATE: IAuthState = {
	email:null,
  id:null,
  userToken:null,
  isLoggedIn: false,
  userId:null,
  phoneNumber:null,
  firstName:null,
  lastName:null,
};

export const authSlice = createSlice({
	name: 'Auth',
	initialState: INITIAL_STATE,
	reducers: {
		logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.phoneNumber = null;
      state.email = null;
      state.userToken = null;
      state.firstName = null;
      state.lastName = null;
      state.id = null;
    },

		setUser(state, action) {
      const {
        email,
        phoneNumber,
        userId,
        userToken,
        lastName,
        firstName,
        id,
      } = action.payload;
      state.email = email;
      state.phoneNumber = phoneNumber;
      state.userId = userId;
      state.userToken = userToken;
      state.firstName = firstName;
      state.lastName = lastName;
      state.id = id;
    },
	},
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
