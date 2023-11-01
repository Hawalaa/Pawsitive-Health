import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	useGetMedicalHistoryQuery,
	useDeleteMedicalMutation,
} from "../../Store/MedicalHistoryApi";
import { Divider, IconButton, Button, Pagination, Stack } from "@mui/material";
import CreateMedicalModal from "../ModalForms/CreateModals/CreateMedicalModal";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecordMedicalHistoryCard({ selectedPetId }) {
	const { data, isLoading, refetch } = useGetMedicalHistoryQuery();
	const [deleteMedical] = useDeleteMedicalMutation();
	const [expanded, setExpanded] = useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;

	useEffect(() => {
		if (data) {
			refetch();
		}
	}, [data, refetch]);

	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
	};

	const openCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const closeCreateModal = () => {
		setIsCreateModalOpen(false);
	};

	const handleDelete = async (medical_id) => {
		await deleteMedical({ medical_id });
		toast.success("Medical record has been deleted");
	};

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

	const filteredData = data.filter(
		(medical) => medical.pet_id === selectedPetId
	);

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
				<CardContent>
					<div style={{ textAlign: "center" }}>
						<h1>Medical History</h1>
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
							Add Medical Record
						</Button>
					</div>
					<CreateMedicalModal
						isOpen={isCreateModalOpen}
						onClose={closeCreateModal}
						selectedPetId={selectedPetId}
					/>
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
									sx={{ display: "flex" }}
								>
									<div style={{ flexGrow: 1 }}>
										<Typography>
											{formatDate(medical.date)}
										</Typography>
									</div>
									<div>
										<Typography
											sx={{
												color: "text.secondary",
											}}
										>
											Veterinarian: {medical.veterinarian}
										</Typography>
									</div>
									<div>
										<IconButton
											aria-label="delete"
											onClick={() =>
												handleDelete(medical.id)
											}
										>
											<DeleteIcon />
										</IconButton>
									</div>
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
