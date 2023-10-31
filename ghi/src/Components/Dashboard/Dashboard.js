import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetWalkHistoryQuery } from "../../Store/WalkHistoryApi";
import { useGetMedicalHistoryQuery } from "../../Store/MedicalHistoryApi";
import { useGetSleepHistoryQuery } from "../../Store/SleepHistoryApi";
import { useGetPoopHealthQuery } from "../../Store/PoopHealthApi";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import MedicalHistoryCard from "../Cards/MedicalHistoryCard";
import PoopHealthCard from "../Cards/PoopHealthCard";
import DailyWalksCard from "../Cards/DailyWalksCard";
import SleepHabitsCard from "../Cards/SleepHabitsCard";
import PoopConsistencyCard from "../Cards/PoopConsistencyCard";
import { useState } from "react";

export default function Dashboard() {
	const { data: walkData } = useGetWalkHistoryQuery();
	const { data: medicalData } = useGetMedicalHistoryQuery();
	const { data: sleepData } = useGetSleepHistoryQuery();
	const { data: poopData } = useGetPoopHealthQuery();
	const [selectedPetId, setSelectedPetId] = useState("");
	const isLargeScreen = useMediaQuery("(min-width:1100px)");

	const handlePetChange = (selectedPetId) => {
		setSelectedPetId(selectedPetId);
	};

	if (walkData && medicalData && sleepData && poopData) {
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
							marginLeft: isLargeScreen ? 10 : 0,
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
							marginLeft: isLargeScreen ? 10 : 0,
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
}
