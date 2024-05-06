import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	services: [],
	status: "idle",
	error: null,
};

const serviceSlice = createSlice({
	name: "service",
	initialState,
	reducers: {
		fetchServicesStart: (state) => {
			state.status = "loading";
		},
		fetchServicesSuccess: (state, action) => {
			state.status = "succeeded";
			// Add any fetched services to the array
			state.services = state.services.concat(action.payload);
		},
		fetchServicesFailure: (state, action) => {
			state.status = "failed";
			state.error = action.payload;
		},
		serviceAdded: (state, action) => {
			state.services.push(action.payload);
		},
		serviceUpdated: (state, action) => {
			const { id, service } = action.payload;
			const existingService = state.services.find(
				(service) => service.id === id
			);
			if (existingService) {
				Object.assign(existingService, service);
			}
		},
		serviceDeleted: (state, action) => {
			state.services = state.services.filter(
				(service) => service.id !== action.payload
			);
		},
	},
});

export const {
	fetchServicesStart,
	fetchServicesSuccess,
	fetchServicesFailure,
	serviceAdded,
	serviceUpdated,
	serviceDeleted,
} = serviceSlice.actions;

export default serviceSlice.reducer;
