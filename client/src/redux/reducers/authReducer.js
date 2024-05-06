import { createSlice } from "@reduxjs/toolkit";
import { setUser, clearUser } from "../slices/userSlice";

const initialState = {
	loading: false,
	email: "",
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signInRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		signInSuccess: (state, action) => {
			state.loading = false;
			state.user = action.payload;
		},
		signInFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.loading = false;
			state.email = "";
		},
	},
});

export const { signInRequest, signInSuccess, signInFailure, logout } =
	authSlice.actions;
export const { reducer } = authSlice;

// Thunks
export const handleSignInSuccess = (user) => (dispatch) => {
	dispatch(setUser(user));
	dispatch(signInSuccess(user));
};

export const handleLogout = () => (dispatch) => {
	dispatch(clearUser());
	dispatch(logout());
};

export default reducer;
