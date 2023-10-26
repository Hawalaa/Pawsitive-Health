import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./DashboardApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { tokenApi } from "./Token";
import { medicalHistoryApi } from "./MedicalHistoryApi";
import { poopHealthApi } from "./PoopHealthApi";
import { petProfileApi } from "./PetProfileApi";
import { userProfileApi } from "./UserProfileApi";
import { walkHistoryApi } from "./WalkHistoryApi";
import { sleepHistoryApi } from "./SleepHistoryApi";
import { feedingHistoryApi } from "./FeedingHistoryApi";
import { immunizationHistoryApi } from "./ImmunizationApi";

export const store = configureStore({
	reducer: {
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		[tokenApi.reducerPath]: tokenApi.reducer,
		[medicalHistoryApi.reducerPath]: medicalHistoryApi.reducer,
		[poopHealthApi.reducerPath]: poopHealthApi.reducer,
		[petProfileApi.reducerPath]: petProfileApi.reducer,
		[userProfileApi.reducerPath]: userProfileApi.reducer,
		[walkHistoryApi.reducerPath]: walkHistoryApi.reducer,
		[sleepHistoryApi.reducerPath]: sleepHistoryApi.reducer,
		[feedingHistoryApi.reducerPath]: feedingHistoryApi.reducer,
		[immunizationHistoryApi.reducerPath]: immunizationHistoryApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(dashboardApi.middleware)
			.concat(tokenApi.middleware)
			.concat(medicalHistoryApi.middleware)
			.concat(poopHealthApi.middleware)
			.concat(petProfileApi.middleware)
			.concat(userProfileApi.middleware)
			.concat(walkHistoryApi.middleware)
			.concat(sleepHistoryApi.middleware)
			.concat(feedingHistoryApi.middleware)
			.concat(immunizationHistoryApi.middleware),
});

setupListeners(store.dispatch);
