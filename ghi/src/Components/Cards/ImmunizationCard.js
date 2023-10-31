import * as React from "react";
import { useState } from "react";
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
import { Divider, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

export default function ImmunizationCard({ selectedPetId }) {
	const { data, isLoading } = useGetImmunizationHistoryQuery();
	const [deleteImmunization] = useDeleteImmunizationMutation();
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
					{filteredData.map((immunization, index) => (
						<Accordion key={index}>
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
										Vaccination: {immunization.vaccination}
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
