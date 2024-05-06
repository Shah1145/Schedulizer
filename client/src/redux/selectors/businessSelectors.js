import { createSelector } from "reselect";

// Selectors
const selectBusiness = (state) => state.business;

export const selectSelectedBusiness = createSelector(
	[selectBusiness],
	(business) => business.selectedBusiness
);
