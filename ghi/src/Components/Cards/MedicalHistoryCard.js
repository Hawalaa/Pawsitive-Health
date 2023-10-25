import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetMedicalHistoryQuery } from "../../Store/MedicalHistoryApi";

export default function MedicalHistoryCard({ selectedPetId }) {
	const { data } = useGetMedicalHistoryQuery();
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
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
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
					<h1 style={{ textAlign: "center" }}>Medical History</h1>
					{filteredData.map((medical, index) => (
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
									{formatDate(medical.date)}
								</Typography>
								<Typography
									sx={{
										color: "text.secondary",
									}}
								>
									{medical.veterinarian}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>{medical.description}</Typography>
							</AccordionDetails>
						</Accordion>
					))}
				</CardContent>
			</Card>
		);
	}
}
