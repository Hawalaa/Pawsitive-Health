import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetDashboardDataQuery } from "../../Store/DashboardApi";

export default function BasicCard() {
	const { data } = useGetDashboardDataQuery();

	if (data) {
		return (
			<Card
				sx={{
					minWidth: 275,
					m: 1,
					height: 515,
					backgroundColor: "rgba(255, 255, 255, 0.99)",
					boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
				}}
			>
				<CardContent>
					<Typography
						sx={{ fontSize: 14 }}
						color="text.secondary"
						gutterBottom
					>
						Word of the Day
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						adjective
					</Typography>
					<Typography variant="body2">
						well meaning and kindly.
						<br />
						{'"a benevolent smile"'}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>
		);
	}
}
