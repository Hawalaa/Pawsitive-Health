import React from "react";
import { useParams } from "react-router-dom";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import { useGetPetProfileDataQuery } from "../../Store/PetProfileApi";

export default function ListPet() {
    // const { data } = useGetDashboardDataQuery();
    const [ pets, setPets ] = React.useState('');
    const { id, pet_id } = useParams(); // get pet id from URL parameters
    // const accountId = user?.account?.id;
    const { data } = useGetPetProfileDataQuery(`${id}, ${pet_id}`);

    const handlePetChange = (e) => {
        setPets(e.target.value);
    };

	if (data) {
    console.log(data)
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
                        {data.pets.map((pet) => {
                            return (
                                <option key={pet.id} value={pet.id}>
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
