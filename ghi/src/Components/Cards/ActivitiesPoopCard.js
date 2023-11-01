import * as React from "react";
import Card from "@mui/material/Card";
import { useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	useGetPoopHealthQuery,
	useDeletePoopMutation,
} from "../../Store/PoopHealthApi";
import AddPoopRecordModal from "../ModalForms/CreateModals/CreatePoopModal";
import UpdatePoopRecordModal from "../ModalForms/UpdateModals/UpdatePoopModal";
import {
	Divider,
	Button,
	IconButton,
	Box,
	Pagination,
	Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

export default function ActivitiesPoopCard({ selectedPetId }) {
	const { data, isLoading } = useGetPoopHealthQuery();
	const [deletePoop] = useDeletePoopMutation();
	const [expanded, setExpanded] = React.useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = React.useState(1);
	const rowsPerPage = 5;

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

	const filteredData = data.filter((poop) => poop.pet_id === selectedPetId);

	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
	};

	const handleDelete = async (poopId) => {
		await deletePoop({ poop_id: poopId });
		toast.error("Poop record has been deleted");
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
					<h1 style={{ textAlign: "center" }}>Poop Health</h1>
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
						Add Poop Record
					</Button>
					<AddPoopRecordModal
						isOpen={isCreateModalOpen}
						onClose={closeCreateModal}
						selectedPetId={selectedPetId}
					/>
					{filteredData
						.slice(startIndex, endIndex)
						.map((poop, index) => (
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
									<Box
										display="flex"
										alignItems="center"
										justifyContent="space-between"
										width="100%"
									>
										<Typography>
											{poop.consistency}
										</Typography>
										<div>
											<IconButton
												aria-label="edit"
												onClick={openUpdateModal}
											>
												<EditIcon />
											</IconButton>
											<UpdatePoopRecordModal
												isOpen={isUpdateModalOpen}
												onClose={closeUpdateModal}
												selectedPetId={selectedPetId}
												poop_id={poop.id}
											/>
											<IconButton
												aria-label="delete"
												onClick={() =>
													handleDelete(poop.id)
												}
											>
												<DeleteIcon />
											</IconButton>
										</div>
									</Box>
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
						Add Poop Record
					</Button>
					<AddPoopRecordModal
						isOpen={isCreateModalOpen}
						onClose={closeCreateModal}
						selectedPetId={selectedPetId}
					/>
				</CardContent>
			</Card>
		);
	}
}
