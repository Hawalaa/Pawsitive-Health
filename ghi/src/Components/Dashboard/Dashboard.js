import React from "react";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";
import Logout from "../Logout";
import BasicTable from "../Table";

export default function Dashboard() {
	const { data } = useGetDashboardDataQuery();

	if (data) {
		return (
			<div>
				<h1>Dashboard Data</h1>
				<Logout />
				<BasicTable />
			</div>
		);
	}
}
