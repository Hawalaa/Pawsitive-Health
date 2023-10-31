// PetSelectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const petSelectionSlice = createSlice({
	name: "petSelection",
	initialState: null,
	reducers: {
		selectPet: (state, action) => {
			return action.payload;
		},
	},
	clearSelectedPet: (state) => {
		return null;
	},
});

export const { selectPet, clearSelectedPet } = petSelectionSlice.actions;
export default petSelectionSlice.reducer;
