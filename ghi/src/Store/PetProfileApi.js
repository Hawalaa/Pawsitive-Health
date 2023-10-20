import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petProfileApi = createApi({
	reducerPath: "petProfileApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000",
		credentials: "include",
	}),
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;

		if (token) {
			console.log("Token", token);
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
	endpoints: (builder) => ({
		getPetProfileData: builder.query({
			query: ({id, pet_id}) => `/user/${id}/pet/${pet_id}`,
		}),
	}),
});

export const { useGetPetProfileDataQuery } = petProfileApi;
