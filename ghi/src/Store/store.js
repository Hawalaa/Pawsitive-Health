import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./DashboardApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tokenApi } from "./Token";
import { medicalHistoryApi } from "./MedicalHistoryApi";
import { poopHealthApi } from "./PoopHealthApi";
import { dailyWalksApi } from "./DailyWalksApi";

export const store = configureStore({
	reducer: {
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		[tokenApi.reducerPath]: tokenApi.reducer,
		[medicalHistoryApi.reducerPath]: medicalHistoryApi.reducer,
		[poopHealthApi.reducerPath]: poopHealthApi.reducer,
		[dailyWalksApi.reducerPath]: dailyWalksApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(dashboardApi.middleware)
			.concat(tokenApi.middleware)
			.concat(medicalHistoryApi.middleware)
			.concat(poopHealthApi.middleware)
			.concat(dailyWalksApi.middleware),
});

setupListeners(store.dispatch);
