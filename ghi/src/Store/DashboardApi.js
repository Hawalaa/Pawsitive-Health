import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
	reducerPath: "dashboardApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
		credentials: "include",
	}),
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
	tagTypes: ["DashboardData"],
	endpoints: (builder) => ({
		getDashboardData: builder.query({
			query: () => "/dashboard",
			providesTags: ["DashboardData"],
		}),
	}),
});

export const { useGetDashboardDataQuery } = dashboardApi;
