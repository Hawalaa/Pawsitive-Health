import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGetDailyWalksQuery } from "../../Store/DailyWalksApi";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function DailyWalksCard({ selectedPetId }) {
	const { data } = useGetDailyWalksQuery();

	if (!data) {
		return <div>Loading...</div>;
	}

	const filteredData = data.filter((walk) => walk.pet_id === selectedPetId);

	const options = {
		responsive: true,
		maintainAspectRatio: true,
		scales: {
			x: {
				title: {
					display: true,
					text: "Date",
				},
			},
			y: {
				title: {
					display: true,
					text: "Duration (minutes)",
				},
			},
		},
	};

	const formatDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const labels = filteredData.map((walk) => formatDate(walk.date));

	const themeColors = ["#BB7843", "#EBA96F", "#EBE09C"];

	const chartData = {
		labels,
		datasets: [
			{
				label: "Duration (minutes)",
				data: filteredData.map((walk) => walk.duration),
				backgroundColor: themeColors, // Assign theme colors to bars
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
		],
	};

	if (filteredData) {
		return (
			<Card
				sx={{
					minWidth: 275,
					m: 1,
					height: 515,
					overflowY: "auto",
					backgroundColor: "rgba(255, 255, 255, 0.99)",
					boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
				}}
			>
				<CardContent sx={{ overflowY: "auto" }}>
					<h1 style={{ textAlign: "center" }}>Daily Walks</h1>
					<Bar data={chartData} options={options} />
				</CardContent>
			</Card>
		);
	}
}
