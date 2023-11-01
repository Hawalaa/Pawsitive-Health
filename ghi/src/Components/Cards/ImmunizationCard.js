import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
	useGetImmunizationHistoryQuery,
	useDeleteImmunizationMutation,
} from "../../Store/ImmunizationApi";
import CreateImmunizationModal from "../ModalForms/CreateModals/CreateImmunizationModal";
import { Divider, Button, IconButton, Pagination, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

export default function ImmunizationCard({ selectedPetId }) {
	const { data, isLoading, refetch } = useGetImmunizationHistoryQuery();
	const [deleteImmunization] = useDeleteImmunizationMutation();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;

	useEffect(() => {
		if (data) {
			refetch();
		}
	}, [data, refetch]);

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
		(immunization) => immunization.pet_id === selectedPetId
	);

	const handlePageChange = (event, newPage) => {
		setCurrentPage(newPage);
	};

	const handleDelete = async (immunization_id) => {
		await deleteImmunization({ immunization_id });
		toast.success("Successfully deleted Immunization record!");
	};

	const openCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const closeCreateModal = () => {
		setIsCreateModalOpen(false);
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
					<div>
						<h1 style={{ textAlign: "center" }}>Immunization</h1>
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
							Add an Immunization Record
						</Button>
					</div>
					<CreateImmunizationModal
						isOpen={isCreateModalOpen}
						onClose={closeCreateModal}
						selectedPetId={selectedPetId}
					/>
					{filteredData
						.slice(startIndex, endIndex)
						.map((immunization, index) => (
							<Accordion key={index + startIndex}>
								<AccordionSummary
									aria-controls={`panel${index}bh-content`}
									id={`panel${index}bh-header`}
									sx={{ display: "flex" }}
								>
									<div style={{ flexGrow: 1 }}>
										<Typography
											sx={{
												width: "65%",
												flexShrink: 0,
												display: "flex",
												alignItems: "center",
											}}
										>
											Vaccination:{" "}
											{immunization.vaccination}
										</Typography>
									</div>
									<div>
										<Typography
											sx={{
												color: "text.secondary",
												display: "flex",
												alignItems: "center",
												marginRight: "10px",
											}}
										>
											Date Valid Until:{" "}
											{formatDate(
												immunization.date_valid_until
											)}
										</Typography>
									</div>
									<div>
										<IconButton
											aria-label="delete"
											onClick={() =>
												handleDelete(immunization.id)
											}
										>
											<DeleteIcon />
										</IconButton>
									</div>
								</AccordionSummary>
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
					<h1 style={{ textAlign: "center" }}>Immunization</h1>
					<Divider />
					<h2 style={{ textAlign: "left" }}>
						No Immunization records Available...
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
						Add an Immunization Record
					</Button>
					<CreateImmunizationModal
						isOpen={isCreateModalOpen}
						onClose={closeCreateModal}
						selectedPetId={selectedPetId}
					/>
				</CardContent>
			</Card>
		);
	}
}
