import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sleepHistoryApi = createApi({
	reducerPath: "sleepHistoryApi",
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
	tagTypes: ['SleepList'],
	endpoints: (builder) => ({
		getSleepHistory: builder.query({
			query: (id, pet_id) => `/user/${id}/pet/${pet_id}/sleeps`,
			providesTags: ['SleepList'],
		}),
		deleteSleep: builder.mutation({
            query: ({ sleep_id }) => ({
                url: `/sleepings/${sleep_id}`,
                method: "DELETE",
                credentials: "include",
            }),
			invalidatesTags: ['SleepList'],
        }),
		createSleep: builder.mutation({
			query: ({ newSleep, petId }) => ({
				url: `/pet/${petId}/sleeps`,
				method: "POST",
				body: newSleep,
				credentials: "include",
			}),
			invalidatesTags: ['SleepList'],
		}),
		updateSleep: builder.mutation({
			query: ({ updatedSleep, petId, sleep_id }) => ({
				url: `/pet/${petId}/sleeps/${sleep_id}`,
				method: "PUT",
				body: updatedSleep,
				credentials: "include",
			}),
			invalidatesTags: ['SleepList'],
		}),
	}),
});

export const {
	useGetSleepHistoryQuery,
	useDeleteSleepMutation,
	useCreateSleepMutation,
	useUpdateSleepMutation
} = sleepHistoryApi;
