import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./Dashboard/DashboardApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tokenApi } from "./Token";
import { petProfileApi } from "./PetProfileApi";

export const store = configureStore({
	reducer: {
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		[tokenApi.reducerPath]: tokenApi.reducer,
		[petProfileApi.reducerPath]: petProfileApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(dashboardApi.middleware)
			.concat(tokenApi.middleware)
			.concat(petProfileApi.middleware),
});

setupListeners(store.dispatch);
