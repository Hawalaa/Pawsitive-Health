import React from "react";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import BasicTable from "../Table";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";

export default function Dashboard() {
	const { data } = useGetDashboardDataQuery();

	if (data) {
		return (
			<div style={{ display: "flex" }}>
				<Navbar />
				<div style={{ margin: 0, padding: 0, width: "100%" }}>
					<TopNavbar />
					{/* <h1>Dashboard Data</h1>
					<BasicTable /> */}
				</div>
			</div>
		);
	}
}
