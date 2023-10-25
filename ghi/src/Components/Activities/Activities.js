import React from "react";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Navbar from "../Dashboard/Navbar";
import TopNavbar from "../Dashboard/TopNavbar";
import ActivitiesPoopCard from "../Cards/ActivitiesPoopCard";
import WalkHistoryCard from "../Cards/WalkHistoryCard";
import SleepHistoryCard from "../Cards/SleepHistoryCard";
import FeedingHistoryCard from "../Cards/FeedingHistoryCard";

export default function Activities() {
	const { data } = useGetDashboardDataQuery();
	const [selectedPetId, setSelectedPetId] = React.useState("");

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
						}}
					>
						<TopNavbar onPetChange={handlePetChange} />
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
							}}
						>
							<WalkHistoryCard selectedPetId={selectedPetId} />
							<SleepHistoryCard selectedPetId={selectedPetId} />
						</div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
							}}
						>
							<FeedingHistoryCard selectedPetId={selectedPetId} />
							<ActivitiesPoopCard selectedPetId={selectedPetId} />
						</div>
					</div>
				</div>
			</>
		);
	}
}
