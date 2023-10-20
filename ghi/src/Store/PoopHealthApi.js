import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const poopHealthApi = createApi({
	reducerPath: "poopHealthApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000",
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
		getPoopHealth: builder.query({
			query: (id, pet_id) => `/user/${id}/pet/${pet_id}/poops`,
		}),
	}),
});

export const { useGetPoopHealthQuery } = poopHealthApi;
