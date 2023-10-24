import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userProfileApi = createApi({
  reducerPath: "userprofileApi",
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
    getUserProfileData: builder.query({
      query: () => "/user/",
    }),
  }),
});

export const { useGetUserProfileDataQuery } = userProfileApi;
