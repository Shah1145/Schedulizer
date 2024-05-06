import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		email: "",
		firstName: "",
		id: "",
		userData: [],
		isUserSignedIn: false, // Add this line
		isCalendarConnected: false, // Add this line
	},
	reducers: {
		setUser: (state, action) => {
			state.email = action.payload.email;
			state.firstName = action.payload.firstName;
			state.id = action.payload.id;
			state.isUserSignedIn = true; // Set this to true when the user is set
		},
		setUserData(state, action) {
			state.userData = action.payload;
		},
		setCalendarConnected: (state, action) => {
			// Add this reducer
			state.calendarConnected = action.payload;
		},
		clearUser: (state) => {
			return {
				...state,
				email: "",
				firstName: "",
				id: "",
				isUserSignedIn: false, // Set this to false when the user is cleared
			};
		},
	},
});

export const { setUser, clearUser, setCalendarConnected } = userSlice.actions; // Export the new action
export const selectCalendarConnected = (state) => state.user.calendarConnected; // Add this line
export const selectUserEmail = (state) => state.user.email;
export const selectUserFirstName = (state) => state.user.firstName;
export const selectUserId = (state) => state.user.id;
export const selectUserData = (state) => state.user.userData;
export const selectIsUserSignedIn = (state) => state.user.isUserSignedIn; // Add this line

export default userSlice.reducer;
