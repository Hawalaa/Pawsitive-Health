import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walkHistoryApi = createApi({
	reducerPath: "walkHistoryApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000",
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
	tagTypes: ['WalkList'],
	endpoints: (builder) => ({
		getWalkHistory: builder.query({
			query: (id, pet_id) => `/user/${id}/pet/${pet_id}/walks`,
			providesTags: ['WalkList'],
		}),
        deleteWalk: builder.mutation({
            query: ({ walk_id }) => ({
                url: `/walks/${walk_id}`,
                method: "DELETE",
                credentials: "include",
            }),
			invalidatesTags: ['WalkList'],
        }),
		createWalk: builder.mutation({
			query: ({ newWalk, petId }) => ({
				url: `/pet/${petId}/walks`,
				method: "POST",
				body: newWalk,
				credentials: "include",
			}),
			invalidatesTags: ['WalkList'],
		}),
		updateWalk: builder.mutation({
			query: ({ updatedWalk, petId, walk_id }) => ({
				url: `/pet/${petId}/walks/${walk_id}`,
				method: "PUT",
				body: updatedWalk,
				credentials: "include",
			}),
			invalidatesTags: ['WalkList'],
		}),
	}),
});

export const {
	useGetWalkHistoryQuery,
	useDeleteWalkMutation,
	useCreateWalkMutation,
	useUpdateWalkMutation
} = walkHistoryApi;
