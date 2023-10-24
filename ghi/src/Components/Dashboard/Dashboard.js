import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import MedicalHistoryCard from "../Cards/MedicalHistoryCard";
import PoopHealthCard from "../Cards/PoopHealthCard";
import DailyWalksCard from "../Cards/DailyWalksCard";
import SleepHabitsCard from "../Cards/SleepHabitsCard";
import PoopConsistencyCard from "../Cards/PoopConsistencyCard";
import { useState } from "react";

export default function Dashboard() {
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
							gridTemplateColumns: isLargeScreen
								? "2fr 1fr"
								: "1fr",
						}}
					>
						<DailyWalksCard selectedPetId={selectedPetId} />
						<MedicalHistoryCard selectedPetId={selectedPetId} />
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: isLargeScreen
								? "1fr 1fr 1fr"
								: "1fr",
						}}
					>
						<SleepHabitsCard selectedPetId={selectedPetId} />
						<PoopConsistencyCard selectedPetId={selectedPetId} />
						<PoopHealthCard selectedPetId={selectedPetId} />
					</div>
				</div>
			</div>
		);
	}

	// You can return a loading indicator or handle other cases here
	return <div>Loading...</div>;
}
