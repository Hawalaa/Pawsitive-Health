import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetDashboardDataQuery } from "../Store/DashboardApi";

export default function BasicTable() {
	const { data } = useGetDashboardDataQuery();

	if (data) {
		return (
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="right">Username</TableCell>
							<TableCell align="right">First Name</TableCell>
							<TableCell align="right">Last Name</TableCell>
							<TableCell align="right">Email</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((user) => (
							<TableRow
								key={user.id}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{user.id}
								</TableCell>
								<TableCell align="right">
									{user.username}
								</TableCell>
								<TableCell align="right">
									{user.first_name}
								</TableCell>
								<TableCell align="right">
									{user.last_name}
								</TableCell>
								<TableCell align="right">
									{user.email}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}
