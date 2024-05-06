import { createSlice } from "@reduxjs/toolkit";
import { setUser, clearUser } from "../slices/userSlice";

const initialState = {
	loading: false,
	error: null,
	token: null, // Add this line
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
			state.token = action.payload; // Set the token when sign in is successful
		},
		signInFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		signOut: (state) => {
			state.loading = false;
			state.token = null; // Clear the token when sign out
		},
	},
});

export const { signInRequest, signInSuccess, signInFailure, signOut } =
	authSlice.actions;

// Thunks
export const handleSignInSuccess = (user, token) => (dispatch) => {
	dispatch(setUser(user));
	dispatch(signInSuccess(token)); // Pass the token here
};

export const handleLogout = () => (dispatch) => {
	dispatch(signOut());
	dispatch(clearUser());
};

export default authSlice.reducer;
