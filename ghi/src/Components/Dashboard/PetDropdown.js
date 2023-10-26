import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";

export default function PetDropdown({ onPetChange }) {
	const { data, refetch } = useGetDashboardDataQuery();
	const [pet, setPet] = React.useState("");

	const handlePetChange = (e) => {
		const selectedPetId = e.target.value;
		setPet(selectedPetId);
		onPetChange(selectedPetId);
	};

	const handleRefresh = () => {
		refetch();
	};

	if (data) {
		return (
			<div>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<InputLabel sx={{ color: "black" }}>Select pet</InputLabel>
					<Select
						labelId="selectPet"
						onMouseDown={handleRefresh}
						id="selectPet"
						value={pet}
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
