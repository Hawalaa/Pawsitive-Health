import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedingHistoryApi = createApi({
	reducerPath: "feedingHistoryApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
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
	tagTypes: ['FeedingList'],
	endpoints: (builder) => ({
		getFeedingHistory: builder.query({
			query: (id, pet_id) => `/user/${id}/pet/${pet_id}/feedings`,
			providesTags: ['FeedingList'],
		}),
        deleteFeeding: builder.mutation({
            query: ({ feeding_id }) => ({
                url: `/feedings/${feeding_id}`,
                method: "DELETE",
                credentials: "include",
            }),
			invalidatesTags: ['FeedingList'],
        }),
		createFeeding: builder.mutation({
			query: ({ newFeeding, petId }) => ({
				url: `/pet/${petId}/feedings`,
				method: "POST",
				body: newFeeding,
				credentials: "include",
			}),
			invalidatesTags: ['FeedingList'],
		}),
		updateFeeding: builder.mutation({
			query: ({ updatedFeeding, petId, feeding_id }) => ({
				url: `/pet/${petId}/feedings/${feeding_id}`,
				method: "PUT",
				body: updatedFeeding,
				credentials: "include",
			}),
			invalidatesTags: ['FeedingList'],
		}),
	})
});

export const {
	useGetFeedingHistoryQuery,
	useDeleteFeedingMutation,
	useCreateFeedingMutation,
	useUpdateFeedingMutation
} = feedingHistoryApi;
