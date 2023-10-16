import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./DashboardApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tokenApi } from "./Token";

export const store = configureStore({
	reducer: {
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		[tokenApi.reducerPath]: tokenApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(dashboardApi.middleware)
			.concat(tokenApi.middleware),
});

setupListeners(store.dispatch);
