import React from "react";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import BasicCard from "./Card";
import MedicalHistoryCard from "../Cards/MedicalHistoryCard";
import PoopHealthCard from "../Cards/PoopHealthCard";
import DailyWalksCard from "../Cards/DailyWalksCard";
import SleepHabitsCard from "../Cards/SleepHabitsCard";
import { useState } from "react";

export default function Dashboard() {
	const { data } = useGetDashboardDataQuery();
	const [selectedPetId, setSelectedPetId] = useState("");

	const handlePetChange = (selectedPetId) => {
		setSelectedPetId(selectedPetId);
	};

	if (data) {
		return (
			<>
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
							overflow: "hidden",
						}}
					>
						<TopNavbar onPetChange={handlePetChange} />
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "2fr 1fr",
							}}
						>
							<DailyWalksCard selectedPetId={selectedPetId} />
							<MedicalHistoryCard selectedPetId={selectedPetId} />
						</div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
							}}
						>
							<SleepHabitsCard selectedPetId={selectedPetId} />
							<BasicCard />
							<PoopHealthCard selectedPetId={selectedPetId} />
						</div>
					</div>
				</div>
			</>
		);
	}
}
