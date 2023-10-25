import React from "react";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Navbar from "../Dashboard/Navbar";
import TopNavbar from "../Dashboard/TopNavbar";
import { useState } from "react";
import ImmunizationCard from "../Cards/ImmunizationCard";
import RecordMedicalHistoryCard from "./RecordMedicalHistoryCard";

export default function Records() {
	const { data } = useGetDashboardDataQuery();
	const [selectedPetId, setSelectedPetId] = useState("");

	const handlePetChange = (selectedPetId) => {
		setSelectedPetId(selectedPetId);
	};

	if (data) {
		return (
			<div style={{ display: "flex" }}>
				<Navbar />
				<div
					style={{
						margin: 0,
						padding: 0,
						width: "100%",
						flexDirection: "column",
						display: "flex",
						transform: "translate(-15px, -8px)",
					}}
				>
					<TopNavbar onPetChange={handlePetChange} />
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr",
						}}
					>
						<ImmunizationCard selectedPetId={selectedPetId} />
						<RecordMedicalHistoryCard
							selectedPetId={selectedPetId}
						/>
					</div>
				</div>
			</div>
		);
	}

	// You can return a loading indicator or handle other cases here
	return <div>Loading...</div>;
}
