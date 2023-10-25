import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGetPoopHealthQuery } from "../../Store/PoopHealthApi.js";
import Typography from "@mui/material/Typography";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PieController,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
	PieController,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

export default function PoopConsistencyCard({ selectedPetId }) {
	const { data } = useGetPoopHealthQuery();

	if (!data) {
		return <div>Loading...</div>;
	}

	const filteredData = data.filter((poop) => poop.pet_id === selectedPetId);

	// Count the occurrences of each consistency category
	const consistencyCounts = {};
	filteredData.forEach((poop) => {
		const consistency = poop.consistency;
		consistencyCounts[consistency] = // creates a new key-value pair
			(consistencyCounts[consistency] || 0) + 1; // if key exists, increment value by 1; otherwise, set value to 1
	});

	const themeColors = [
		"rgba(255, 161, 102, .5)",
		"rgba(255, 255, 176, .5)",
		"rgba(51, 255, 87, .5)",
	];

	const hoverColors = [
		"rgba(255, 161, 102, 1)",
		"rgba(255, 255, 176, 1)",
		"rgba(51, 255, 87, 1)",
	];

	const pieChartData = {
		labels: Object.keys(consistencyCounts), // Consistency categories
		datasets: [
			{
				data: Object.values(consistencyCounts), // Count of occurrences
				backgroundColor: themeColors,
				hoverBackgroundColor: hoverColors,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: true,
				position: "right",
			},
		},
	};

	return (
		<Card
			sx={{
				minWidth: 275,
				m: 1,
				height: 515,
				overflowY: "auto",
				backgroundColor: "rgba(255, 255, 255, 0.99)",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
				alignContent: "center",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			<CardContent
				sx={{
					maxHeight: 400,
					overflowY: "auto",
					alignContent: "center",
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				}}
			>
				<h1 style={{ textAlign: "center" }}>Poop Consistency</h1>
				<Pie data={pieChartData} options={options} />
			</CardContent>

			{consistencyCounts["Firm"] > consistencyCounts["Soft"] &&
			consistencyCounts["Firm"] > consistencyCounts["Liquid"] ? (
				<Typography variant="body2" color="text.secondary">
					Your pet's poop consistency is generally firm and healthy.
					No need to worry.
				</Typography>
			) : consistencyCounts["Soft"] > consistencyCounts["Firm"] &&
			  consistencyCounts["Soft"] > consistencyCounts["Liquid"] ? (
				<Typography variant="body2" color="text.secondary">
					Your pet's poop consistency is soft. Please monitor it over
					the next week for any changes.
				</Typography>
			) : consistencyCounts["Liquid"] > consistencyCounts["Soft"] &&
			  consistencyCounts["Liquid"] > consistencyCounts["Firm"] ? (
				<Typography variant="body2" color="text.secondary">
					Your pet may have diarrhea. Keep an eye on its condition and
					consider consulting a vet.
				</Typography>
			) : (
				<Typography variant="body2" color="text.secondary"></Typography>
			)}
		</Card>
	);
}
