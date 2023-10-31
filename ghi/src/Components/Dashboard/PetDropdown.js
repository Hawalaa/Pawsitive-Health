import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPet } from "../../Store/petSelectionSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import { useEffect } from "react";

export default function PetDropdown() {
	const { data, refetch } = useGetDashboardDataQuery();
	const selectedPet = useSelector((state) => state.petSelection) || "";
	const dispatch = useDispatch();

	const handlePetChange = (e) => {
		const selectedPetId = e.target.value;
		dispatch(selectPet(selectedPetId));
		refetch();
	};

	useEffect(() => {
		if (data) {
			const petList = data[0].pets;
			if (!selectedPet && petList.length > 0) {
				const firstPetId = petList[0].id;
				dispatch(selectPet(firstPetId));
				refetch();
			}
		}
		refetch();
	}, [data, selectedPet, dispatch, refetch]);

	if (data) {
		return (
			<div>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<InputLabel sx={{ color: "black" }}>Select pet</InputLabel>
					<Select
						labelId="selectPet"
						id="selectPet"
						value={selectedPet || ""}
						label="Select Pet"
						onChange={handlePetChange}
						sx={{
							borderColor: "white !important",
							color: "black",
							borderRadius: "50px",
							background: "#EBE09C",
						}}
					>
						{data[0].pets.map((pet) => (
							<MenuItem key={pet.id} value={pet.id}>
								{pet.pet_name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		);
	}
}
