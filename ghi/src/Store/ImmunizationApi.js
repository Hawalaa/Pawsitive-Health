import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const immunizationHistoryApi = createApi({
	reducerPath: "immunizationHistoryApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000",
		credentials: "include",
	}),
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;

		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}

		return headers;
	},
	tagTypes: ["ImmunizationList"],
	endpoints: (builder) => ({
		getImmunizationHistory: builder.query({
			query: (id, pet_id) => `/user/${id}/pet/${pet_id}/immunization`,
			providesTags: ["ImmunizationList"],
		}),
		deleteImmunization: builder.mutation({
			query: ({ immunization_id }) => ({
				url: `/immunization/${immunization_id}`,
				method: "DELETE",
				credentials: "include",
			}),
			invalidatesTags: ["ImmunizationList"],
		}),
		createImmunization: builder.mutation({
			query: ({ newImmunization, pet_id }) => ({
				url: `/pet/${pet_id}/immunization`,
				method: "POST",
				body: newImmunization,
				credentials: "include",
			}),
			invalidatesTags: ["ImmunizationList"],
		}),
		updateImmunization: builder.mutation({
			query: ({ updateImmunization, pet_id, immunization_id }) => ({
				url: `/pet/${pet_id}/immunization/${immunization_id}`,
				method: "PUT",
				body: updateImmunization,
				credentials: "include",
			}),
			invalidatesTags: ["ImmunizationList"],
		}),
	}),
});

export const {
	useGetImmunizationHistoryQuery,
	useDeleteImmunizationMutation,
	useCreateImmunizationMutation,
	useUpdateImmunizationMutation,
} = immunizationHistoryApi;
