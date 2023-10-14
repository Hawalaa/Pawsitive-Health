import React from "react";
import { useGetDashboardDataQuery } from "../../Store/Dashboard/DashboardApi";

export default function Dashboard() {
	const { data } = useGetDashboardDataQuery();

	if (data) {
		return (
			<div>
				<h1>Dashboard Data</h1>
			</div>
		);
	}
}
