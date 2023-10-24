import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const poopHealthApi = createApi({
	reducerPath: "poopHealthApi",
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
	tagTypes: ['PoopList'],
	endpoints: (builder) => ({
		getPoopHealth: builder.query({
			query: (id, pet_id) => `/user/${id}/pet/${pet_id}/poops`,
			providesTags: ['PoopList'],
		}),
		deletePoop: builder.mutation({
            query: ({ poop_id }) => ({
                url: `/poops/${poop_id}`,
                method: "DELETE",
                credentials: "include",
            }),
			invalidatesTags: ['PoopList'],
        }),
		createPoop: builder.mutation({
			query: ({ newPoop, petId }) => ({
				url: `/pet/${petId}/poops`,
				method: "POST",
				body: newPoop,
				credentials: "include",
			}),
			invalidatesTags: ['PoopList'],
		}),
		updatePoop: builder.mutation({
			query: ({ updatedPoop, petId, poop_id }) => ({
				url: `/pet/${petId}/poops/${poop_id}`,
				method: "PUT",
				body: updatedPoop,
				credentials: "include",
			}),
			invalidatesTags: ['PoopList'],
		}),
	}),
});

export const {
	useGetPoopHealthQuery,
	useDeletePoopMutation,
	useCreatePoopMutation,
	useUpdatePoopMutation
} = poopHealthApi;
