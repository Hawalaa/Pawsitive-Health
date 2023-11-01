import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetMedicalHistoryQuery } from "../../Store/MedicalHistoryApi";
import { Pagination, Stack } from "@mui/material";

export default function MedicalHistoryCard({ selectedPetId }) {
	const { data, isLoading } = useGetMedicalHistoryQuery();
	const [expanded, setExpanded] = React.useState(false);
	const [currentPage, setCurrentPage] = React.useState(1);
	const rowsPerPage = 5;

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
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

	if (data) {
		const filteredData = data.filter(
			(poop) => poop.pet_id === selectedPetId
		);

		const startIndex = (currentPage - 1) * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;

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
					{filteredData
						.slice(startIndex, endIndex)
						.map((medical, index) => (
							<Accordion
								key={index + startIndex}
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
										Input Date: {formatDate(medical.date)}
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
									<Typography>
										{medical.description}
									</Typography>
								</AccordionDetails>
							</Accordion>
						))}
					<Stack
						direction="row"
						spacing={2}
						justifyContent={"center"}
						sx={{ mt: 2 }}
					>
						<Pagination
							count={Math.ceil(filteredData.length / rowsPerPage)}
							page={currentPage}
							onChange={handlePageChange}
							size="md"
							sx={{
								"& .MuiPaginationItem-icon": {
									color: "#BB7843",
								},
								"& .MuiPaginationItem-page.Mui-selected": {
									backgroundColor: "#EBE09C",
								},
							}}
						/>
					</Stack>
				</CardContent>
			</Card>
		);
	}
}
