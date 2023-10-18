import React from "react";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
// import { useGetPetProfileDataQuery } from "../../Store/PetProfileApi";

export default function ListPet() {
	// const { data } = useGetPetProfileDataQuery();
    const { data } = useGetDashboardDataQuery();
    const [ pets, setPets ] = React.useState('');

    const handlePetChange = (e) => {
        setPets(e.target.value);
    };

	if (data) {
    console.log(data[0].pets)
		return (
			<div>
				<h1>Pet Profile: {data.pet_name}</h1>
                <div className="form-floating mb-3">
                    <select
                    value={pets}
                    onChange={handlePetChange}
                    required
                    name="pet"
                    id="pet"
                    className="form-select"
                    >
                        <option value="">Choose a pet</option>
                        {data[0].pets.map((pet) => {
                            return (
                                <option key={pet.pet_id} value={pet.pet_id}>
                            {pet.pet_name}
                            </option>
                            );
                        })}
                    </select>
                </div>
			</div>
		);
	}
}
