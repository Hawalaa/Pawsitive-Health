import React from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Navbar from "../Dashboard/Navbar";
import TopNavbar from "../Dashboard/TopNavbar";
import ImmunizationCard from "../Cards/ImmunizationCard";
import RecordMedicalHistoryCard from "./RecordMedicalHistoryCard";

export default function Records() {
	const selectedPetId = useSelector((state) => state.petSelection);
	const { data } = useGetDashboardDataQuery(selectedPetId);
	const isLargeScreen = useMediaQuery("(min-width:1100px)");

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
					<TopNavbar />
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
