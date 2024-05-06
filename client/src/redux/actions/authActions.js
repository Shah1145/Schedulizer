// src/redux/actions/authActions.js
export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";
export const LOGOUT = "LOGOUT";

export const signInRequest = (userData) => ({
	type: SIGN_IN_REQUEST,
	payload: userData,
});

export const signInSuccess = (user) => ({
	type: SIGN_IN_SUCCESS,
	payload: user,
});

export const signInFailure = (error) => ({
	type: SIGN_IN_FAILURE,
	payload: error,
});

export const logoutAction = () => ({
	type: LOGOUT,
});
