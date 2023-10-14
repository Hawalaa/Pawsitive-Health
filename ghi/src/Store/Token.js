import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tokenApi = createApi({
	reducerPath: "token",
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
	endpoints: (builder) => ({
		getToken: builder.query({
			query: () => "/token",
			credentials: "include",
		}),
		createToken: builder.mutation({
			query: ({ data }) => {
				const formData = new FormData();

				formData.append("username", data.username);
				formData.append("password", data.password);

				return {
					url: "/token",
					method: "post",
					body: formData,
					credentials: "include",
				};
			},
		}),
	}),
});

export const { useGetTokenQuery, useCreateTokenMutation } = tokenApi;
