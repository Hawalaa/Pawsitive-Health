import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Navbar from "../Dashboard/Navbar";
import TopNavbar from "../Dashboard/TopNavbar";
import { useState } from "react";
import ImmunizationCard from "../Cards/ImmunizationCard";
import RecordMedicalHistoryCard from "./RecordMedicalHistoryCard";

export default function Records() {
	const { data } = useGetDashboardDataQuery();
	const [selectedPetId, setSelectedPetId] = useState("");
	const isLargeScreen = useMediaQuery("(min-width:1100px)");

	const handlePetChange = (selectedPetId) => {
		setSelectedPetId(selectedPetId);
	};

	if (data) {
		return (
			<div style={{ display: "flex" }}>
				<Navbar />
				<div
					style={{
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
							marginLeft: isLargeScreen ? 10 : 0,
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
}
