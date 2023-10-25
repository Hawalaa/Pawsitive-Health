import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const medicalHistoryApi = createApi({
	reducerPath: "medicalHistoryApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
		credentials: "include",
	}),
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		return headers;
	},
	tagTypes: ["MedicalList"],
	endpoints: (builder) => ({
		getMedicalHistory: builder.query({
			query: (id, pet_id) => `/user/${id}/pet/${pet_id}/medical`,
			providesTags: ["MedicalList"],
		}),
		deleteMedical: builder.mutation({
			query: ({ medical_id }) => ({
				url: `/medical/${medical_id}`,
				method: "DELETE",
				credentials: "include",
			}),
			invalidatesTags: ["MedicalList"],
		}),
		createMedical: builder.mutation({
			query: ({ newMedical, pet_id }) => ({
				url: `/pet/${pet_id}/medical`,
				method: "POST",
				body: newMedical,
				credentials: "include",
			}),
			invalidatesTags: ["MedicalList"],
		}),
		updateMedical: builder.mutation({
			query: ({ updateMedical, pet_id, medical_id }) => ({
				url: `/pet/${pet_id}/medical/${medical_id}}`,
				method: "PUT",
				body: updateMedical,
				credentials: "include",
			}),
			invalidatesTags: ["MedicalList"],
		}),
	}),
});

export const {
	useGetMedicalHistoryQuery,
	useDeleteMedicalMutation,
	useCreateMedicalMutation,
	useUpdateMedicalMutation,
} = medicalHistoryApi;
