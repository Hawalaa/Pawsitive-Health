import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetPoopHealthQuery } from "../../Store/PoopHealthApi";
import { Divider } from "@mui/material";

export default function PoopHealthCard({ selectedPetId }) {
	const { data } = useGetPoopHealthQuery();
	const [expanded, setExpanded] = React.useState(false);

	if (!data) {
		return <div>Loading...</div>;
	}

	const filteredData = data.filter((poop) => poop.pet_id === selectedPetId);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
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

	const formatTime = (timeString) => {
		// Split the time string into hours, minutes, and seconds
		const [hours, minutes] = timeString.split(":");

		// Convert to numbers
		const numericHours = parseInt(hours, 10);
		const numericMinutes = parseInt(minutes, 10);

		// Determine whether it's AM or PM
		const period = numericHours >= 12 ? "PM" : "AM";

		// Convert hours to 12-hour format
		const formattedHours = numericHours % 12 || 12;

		// Add leading zero to minutes if it's a single digit
		const formattedMinutes =
			numericMinutes < 10 ? `0${numericMinutes}` : numericMinutes;

		// Format the time in 12-hour clock format
		return `${formattedHours}:${formattedMinutes} ${period}`;
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
					<h1 style={{ textAlign: "center" }}>Poop Health</h1>
					{filteredData.map((poop, index) => (
						<Accordion
							key={index}
							expanded={expanded === `panel${index}`}
							onChange={handleChange(`panel${index}`)}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls={`panel${index}bh-content`}
								id={`panel${index}bh-header`}
							>
								<Typography
									sx={{ width: "80%", flexShrink: 0 }}
								>
									{formatDate(poop.date)}
								</Typography>
								<Typography
									sx={{
										color: "text.secondary",
									}}
								>
									{formatTime(poop.time)}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>{poop.consistency}</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</CardContent>
			</Card>
		);
	} else {
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
					<h1 style={{ textAlign: "center" }}>Poop Health</h1>
					<Divider />
					<h2 style={{ textAlign: "left" }}>
						No Poop Health Data Available...
					</h2>
				</CardContent>
			</Card>
		);
	}
}
