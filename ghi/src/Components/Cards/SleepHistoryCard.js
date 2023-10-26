import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	useGetSleepHistoryQuery,
	useDeleteSleepMutation,
} from "../../Store/SleepHistoryApi";
import AddSleepRecordModal from "../ModalForms/CreateModals/CreateSleepModal";
import UpdateSleepRecordModal from "../ModalForms/UpdateModals/UpdateSleepModal";
import { Divider, Button, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

export default function SleepHistoryCard({ selectedPetId }) {
	const { data } = useGetSleepHistoryQuery();
	const [deleteSleep] = useDeleteSleepMutation();
	const [expanded, setExpanded] = React.useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

	if (!data) {
		return <div>Loading...</div>;
	}

	const filteredData = data.filter((sleep) => sleep.pet_id === selectedPetId);

	const handleDelete = async (sleepId) => {
		await deleteSleep({ sleep_id: sleepId });
		toast.error("Sleep has been deleted");
	};

	const openCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const closeCreateModal = () => {
		setIsCreateModalOpen(false);
	};

	const openUpdateModal = () => {
		setIsUpdateModalOpen(true);
	};

	const closeUpdateModal = () => {
		setIsUpdateModalOpen(false);
	};

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
					<h1 style={{ textAlign: "center" }}>Sleep History</h1>
					<Divider />
					<Button
						variant="text"
						color="primary"
						sx={{
							color: "black",
							backgroundColor: "#EBE09C",
							borderRadius: "50px",
							my: "10px",
							position: "relative",
							width: "100%",
						}}
						onClick={openCreateModal}
					>
						Add Sleeping Record
					</Button>
					<AddSleepRecordModal
						isOpen={isCreateModalOpen}
						onClose={closeCreateModal}
						selectedPetId={selectedPetId}
					/>
					{filteredData.map((sleep, index) => (
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
									{formatDate(sleep.date)}
								</Typography>
								<Typography
									sx={{
										color: "text.secondary",
									}}
								>
									{formatTime(sleep.time)}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									width="100%"
								>
									<Typography>{sleep.duration} minutes</Typography>
									<div>
										<IconButton
											aria-label="edit"
											onClick={openUpdateModal}
										>
											<EditIcon />
										</IconButton>
										<UpdateSleepRecordModal
											isOpen={isUpdateModalOpen}
											onClose={closeUpdateModal}
											selectedPetId={selectedPetId}
											sleep_id={sleep.id}
										/>
										<IconButton
											aria-label="delete"
											onClick={() =>
												handleDelete(sleep.id)
											}
										>
											<DeleteIcon />
										</IconButton>
									</div>
								</Box>
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
					<h1 style={{ textAlign: "center" }}>Sleep History</h1>
					<Divider />
					<h2 style={{ textAlign: "left" }}>
						No Sleep Data Available...
					</h2>
					<Button
						variant="text"
						color="primary"
						sx={{
							color: "black",
							backgroundColor: "#EBE09C",
							borderRadius: "50px",
							marginBottom: "10px",
							position: "relative",
							bottom: "-18px",
						}}
						onClick={openCreateModal}
					>
						Add Sleeping Record
					</Button>
					<AddSleepRecordModal
						isOpen={isCreateModalOpen}
						onClose={closeCreateModal}
						selectedPetId={selectedPetId}
					/>
				</CardContent>
			</Card>
		);
	}
}
