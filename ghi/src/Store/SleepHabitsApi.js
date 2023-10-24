import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sleepHabitsApi = createApi({
	reducerPath: "sleepHabitsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
		credentials: "include",
	}),
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;

		if (token) {
			console.log("Token", token);
			headers.set("Authorization", `Bearer ${token}`);
		}

		return headers;
	},
	endpoints: (builder) => ({
		getSleepHabits: builder.query({
			query: (id, pet_id) => `/user/${id}/pet/${pet_id}/sleeps`,
		}),
	}),
});

export const { useGetSleepHabitsQuery } = sleepHabitsApi;
