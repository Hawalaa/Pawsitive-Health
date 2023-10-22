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
); // Register the chart elements to be used within this chart

export default function PoopHealthCard({ selectedPetId }) {
	const { data } = useGetDailyWalksQuery(); // Get data from this API

	// If there is no data, return "Loading..."
	if (!data) {
		return <div>Loading...</div>;
	}

	// Filter the data to only include the selected pet
	const filteredData = data.filter((poop) => poop.pet_id === selectedPetId);

	// Options for the chart
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

	// Format the date from yyyy-mm-dd to Month Day, Year
	const formatDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	// Create an array of dates from the filtered data
	const labels = filteredData.map((walk) => formatDate(walk.date));

	// Data for the chart
	const chartData = {
		labels,
		datasets: [
			{
				label: "Walk 1",
				data: filteredData.map((walk) => walk.duration),
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgba(255, 99, 132, 1)",
				borderWidth: 1,
			},
			{
				label: "walk 2",
				data: filteredData.map((walk) => walk.duration),
				backgroundColor: "rgba(54, 162, 235, 0.2)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 1,
			},
			{
				label: "Walk 3",
				data: filteredData.map((walk) => walk.duration),
				backgroundColor: "rgba(255, 206, 86, 0.2)",
				borderColor: "rgba(255, 206, 86, 1)",
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
