import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./DashboardApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tokenApi } from "./Token";
import { medicalHistoryApi } from "./MedicalHistoryApi";
import { poopHealthApi } from "./PoopHealthApi";
import { petProfileApi } from "./PetProfileApi";
import { userprofileApi } from "./UserProfileApi";

export const store = configureStore({
	reducer: {
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		[tokenApi.reducerPath]: tokenApi.reducer,
		[medicalHistoryApi.reducerPath]: medicalHistoryApi.reducer,
		[poopHealthApi.reducerPath]: poopHealthApi.reducer,
		[petProfileApi.reducerPath]: petProfileApi.reducer,
		[userprofileApi.reducerPath]: userprofileApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(dashboardApi.middleware)
			.concat(tokenApi.middleware)
			.concat(medicalHistoryApi.middleware)
			.concat(poopHealthApi.middleware)
			.concat(petProfileApi.middleware)
			.concat(userprofileApi.middleware),
});

setupListeners(store.dispatch);
