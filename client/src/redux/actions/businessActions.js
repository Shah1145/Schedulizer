export const SET_IS_BUSINESS_REGISTERED = "SET_IS_BUSINESS_REGISTERED";
export const SET_USER_BUSINESSES = "SET_USER_BUSINESSES";
export const SET_SELECTED_BUSINESS = "SET_SELECTED_BUSINESS";
export const SET_IS_LOADING = "SET_IS_LOADING";

export const setIsBusinessRegistered = (isBusinessRegistered) => ({
	type: SET_IS_BUSINESS_REGISTERED,
	payload: isBusinessRegistered,
});

export const setUserBusinesses = (userBusinesses) => ({
	type: SET_USER_BUSINESSES,
	payload: userBusinesses,
});

export const setSelectedBusiness = (selectedBusiness) => ({
	type: SET_SELECTED_BUSINESS,
	payload: selectedBusiness,
});

export const setIsLoading = (isLoading) => ({
	type: SET_IS_LOADING,
	payload: isLoading,
});
