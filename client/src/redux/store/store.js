import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
	handleSignInSuccess,
	handleLogout,
} from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import businessReducer from "../slices/businessSlice";
import serviceReducer from "../slices/serviceSlice"; // import the service reducer

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		business: businessReducer,
		service: serviceReducer, // add the service reducer to the store
	},
});

export const dispatchSignInSuccess = (user) => (dispatch) => {
	dispatch(handleSignInSuccess(user));
};

export const dispatchLogout = () => (dispatch) => {
	dispatch(handleLogout());
};

export default store;
