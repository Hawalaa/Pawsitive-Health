import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useGetSleepHistoryQuery } from "../../Store/SleepHistoryApi";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	Title,
	Tooltip,
	Legend,
	PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	LineElement,
	Title,
	Tooltip,
	Legend,
	PointElement
);

export default function SleepHabitsCard({ selectedPetId }) {
	const { data, refetch, isLoading } = useGetSleepHistoryQuery();

	useEffect(() => {
		if (data) {
			refetch();
		}
	}, [data, refetch]);

	if (isLoading) {
		// Display "Loading..." while data is loading
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
					<h1 style={{ textAlign: "center" }}>Loading...</h1>
				</CardContent>
			</Card>
		);
	}

	const filteredData = data.filter((sleep) => sleep.pet_id === selectedPetId);

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

	const labels = filteredData.map((sleep) => formatDate(sleep.date));

	const chartData = {
		labels,
		datasets: [
			{
				label: "Duration (minutes)",
				data: filteredData.map((sleep) => sleep.duration),
				backgroundColor: "#BB7843",
				borderColor: "#BB7843",
				borderWidth: 2,
				pointBackgroundColor: "#BB7843",
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
					<h1 style={{ textAlign: "center" }}>Sleep Habits</h1>
					<Line data={chartData} options={options} />
				</CardContent>
			</Card>
		);
	}
}
