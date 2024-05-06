import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectUserEmail } from "../slices/userSlice";

const businessSlice = createSlice({
	name: "business",
	initialState: {
		isBusinessRegistered: false,
		loading: false,
		error: null,
		businessData: null,
	},
	reducers: {
		setIsBusinessRegistered(state, action) {
			state.isBusinessRegistered = action.payload;
		},
		setLoading(state, action) {
			state.loading = action.payload;
		},
		registerBusinessRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		registerBusinessSuccess: (state, action) => {
			state.loading = false;
			state.businessData = action.payload;
		},
		registerBusinessFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		setBusinessData(state, action) {
			state.businessData = action.payload;
		},
		clearBusiness(state) {
			state.isBusinessRegistered = false;
			state.loading = false;
			state.error = null;
			state.businessData = null;
		},
	},
});

export const fetchUserBusinesses = createAsyncThunk(
	"businesses/fetchUserBusinesses",
	async (_, { getState, dispatch }) => {
		try {
			const userEmail = selectUserEmail(getState());

			// Fetch all businesses
			const response = await fetch("/businesses/all");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const allBusinesses = await response.json();

			// console.log("All businesses:", allBusinesses);

			// Check if any of the businesses has the user's email
			const userBusinesses = allBusinesses.filter(
				(business) => business.userEmail === userEmail
			);

			// If the user has any businesses, dispatch the necessary actions
			if (userBusinesses.length > 0) {
				dispatch(setBusinessData(userBusinesses[0]));
				dispatch(setIsBusinessRegistered(true));
			} else {
				dispatch(setIsBusinessRegistered(false));
			}
		} catch (error) {
			console.error("Failed to fetch user businesses:", error);
		}
	}
);

export const {
	setIsBusinessRegistered,
	setLoading,
	registerBusinessRequest,
	registerBusinessSuccess,
	registerBusinessFailure,
	setBusinessData,
	clearBusiness,
} = businessSlice.actions;

export default businessSlice.reducer;
