import React from "react";
import { useGetPetProfileDataQuery } from "../../Store/PetProfileApi";

export default function ListPet() {
	const { data } = useGetPetProfileDataQuery();
    console.log(data)


	if (data) {
		return (
			<div>
				<h1>Pet Profile: {data.pet_name}</h1>
			</div>
		);
	}
}
