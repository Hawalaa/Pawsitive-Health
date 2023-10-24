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
  tagTypes: ["PetList"],
  endpoints: (builder) => ({
    getUserProfileData: builder.query({
      query: () => "/user/",
      providesTags: ["PetList"],
    }),
    createPetData: builder.mutation({
      query: ({ newPet, id }) => ({
        url: `/user/${id}/pet`,
        method: "POST",
        body: newPet,
        credentials: "include",
      }),
      invalidatesTags: ["PetList"],
    }),
  }),
});

export const {
  useGetUserProfileDataQuery,
  useCreatePetDataMutation
} = userProfileApi;
