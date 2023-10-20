import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userprofileApi = createApi({
    reducerPath: "userprofileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        credentials: "include",
    }),
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;

        if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
	endpoints: (builder) => ({
		getUserProfileData: builder.query({
			query: () => "/user/",
		}),
	}),
});

export const { useGetUserProfileDataQuery } = userprofileApi;
