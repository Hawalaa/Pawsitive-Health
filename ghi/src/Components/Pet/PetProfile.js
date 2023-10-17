import React from "react";
import { useGetPetProfileDataQuery } from "../../Store/PetProfileApi";

export default function ListPet() {
	const { data } = useGetPetProfileDataQuery();
    const [ pet, setPet ] = React.useState([]);

    const handlePetChange = (e) => {
        setPet(e.target.value);
    };

	if (data) {
    console.log(data)
		return (
			<div>
				<h1>Pet Profile: {data.pet_name}</h1>
                <div className="form-floating mb-3">
                    <select
                    value={pet}
                    onChange={handlePetChange}
                    required
                    name="pet"
                    id="pet"
                    className="form-select"
                    >
                        <option value="">Choose a pet</option>
                        {data[0].pets.map((pet) => {
                            // const fullName = `${pet.first_name} ${pet.last_name}`;
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
