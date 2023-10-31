import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGetWalkHistoryQuery } from "../../Store/WalkHistoryApi";
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
	const { data, refetch, isLoading } = useGetWalkHistoryQuery();

	useEffect(() => {
		if (data) {
			refetch();
		}
	}, [data, refetch]);

	// Display loading card while data is loading
	if (isLoading) {
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
				<CardContent
					sx={{
						height: "auto",
						maxHeight: 430,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h1 style={{ textAlign: "center" }}>Loading...</h1>
				</CardContent>
			</Card>
		);
	}

	// Once data is loaded, render the chart
	if (data) {
		const filteredData = data.filter(
			(walk) => walk.pet_id === selectedPetId
		);

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
				timeZone: "UTC",
			};
			return new Date(dateString).toLocaleDateString(undefined, options);
		};

		const labels = filteredData.map((walk) => formatDate(walk.date));

		const themeColors = [
			"rgba(255, 87, 51, .5)",
			"rgba(255, 195, 0, .5)",
			"rgba(51, 255, 87, .5)",
		];

		const hoverColors = [
			"rgba(255, 87, 51, 1)",
			"rgba(255, 195, 0, 1)",
			"rgba(51, 255, 87, 1)",
		];

		const chartData = {
			labels,
			datasets: [
				{
					label: "Duration (minutes)",
					data: filteredData.map((walk) => walk.duration),
					backgroundColor: themeColors,
					borderColor: themeColors,
					borderWidth: 1,
					hoverBackgroundColor: hoverColors,
				},
			],
		};

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
				<CardContent
					sx={{
						height: "auto",
						maxHeight: 430,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h1 style={{ textAlign: "center" }}>Daily Walks</h1>
					<Bar data={chartData} options={options} />
				</CardContent>
			</Card>
		);
	}
}
