import React from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Navbar from "../Dashboard/Navbar";
import TopNavbar from "../Dashboard/TopNavbar";
import ActivitiesPoopCard from "../Cards/ActivitiesPoopCard";
import WalkHistoryCard from "../Cards/WalkHistoryCard";
import SleepHistoryCard from "../Cards/SleepHistoryCard";
import FeedingHistoryCard from "../Cards/FeedingHistoryCard";

export default function Activities() {
	const selectedPetId = useSelector((state) => state.petSelection);
	const { data } = useGetDashboardDataQuery(selectedPetId);
	// const [selectedPetId, setSelectedPetId] = React.useState("");
	const isLargeScreen = useMediaQuery("(min-width:1100px)");

	// const handlePetChange = (selectedPetId) => {
	// 	setSelectedPetId(selectedPetId);
	// };

	if (data) {
		return (
			<>
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
						<TopNavbar />
						<div
							style={{
								display: "grid",
								gridTemplateColumns: isLargeScreen
									? "1fr 1fr"
									: "1fr",
								marginLeft: isLargeScreen ? 10 : 0,
							}}
						>
							<WalkHistoryCard selectedPetId={selectedPetId} />
							<SleepHistoryCard selectedPetId={selectedPetId} />
						</div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: isLargeScreen
									? "1fr 1fr"
									: "1fr",
								marginLeft: isLargeScreen ? 10 : 0,
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
