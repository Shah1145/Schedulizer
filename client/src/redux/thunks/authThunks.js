import { setUser, clearUser } from "../slices/userSlice";
import { signInSuccess, logout } from "../slices/authSlice";

export const handleSignInSuccess = (user) => (dispatch) => {
	dispatch(setUser(user));
	dispatch(signInSuccess(user));
};

export const handleLogout = () => (dispatch) => {
	dispatch(clearUser());
	dispatch(logout());
};
