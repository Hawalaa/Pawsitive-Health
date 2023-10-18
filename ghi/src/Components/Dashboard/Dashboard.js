import React from "react";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import BasicCard from "./Card";
import MedicalHistoryCard from "../Cards/MedicalHistoryCard";
import PoopHealthCard from "../Cards/PoopHealthCard";
import DailyWalksCard from "../Cards/DailyWalksCard";

export default function Dashboard() {
	const { data } = useGetDashboardDataQuery();

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
						}}
					>
						<TopNavbar />
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "2fr 1fr",
							}}
						>
							<DailyWalksCard />
							<MedicalHistoryCard />
						</div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
							}}
						>
							<BasicCard />
							<BasicCard />
							<PoopHealthCard />
						</div>
					</div>
				</div>
			</>
		);
	}
}
