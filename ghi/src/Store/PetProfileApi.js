import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petProfileApi = createApi({
	reducerPath: "petProfileApi",
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
	tagTypes: ["PetProfile"],
	endpoints: (builder) => ({
		// GET
		getPetProfileData: builder.query({
			query: ({ id, pet_id }) => `/user/${id}/pet/${pet_id}`,
			providesTags: ["PetProfile"],
		}),
		// DELETE
		deletePetProfile: builder.mutation({
			query: ({ id, pet_id }) => ({
				url: `/user/${id}/pet/${pet_id}`,
				method: "DELETE",
				credentials: "include",
			}),
			invalidatesTags: ["PetProfile"],
		}),
		// PUT
		updatePetProfile: builder.mutation({
			query: ({ updatedPetProfile, id, pet_id }) => ({
				url: `/user/${id}/pet/${pet_id}`,
				method: "PUT",
				body: updatedPetProfile,
				credentials: "include",
			}),
			invalidatesTags: ["PetProfile"],
		}),
	}),
});

export const {
	useGetPetProfileDataQuery,
	useDeletePetProfileMutation,
	useUpdatePetProfileMutation,
} = petProfileApi;
