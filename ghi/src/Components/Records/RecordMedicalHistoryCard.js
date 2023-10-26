import * as React from "react";
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
import { Divider, IconButton, Button } from "@mui/material";
import CreateMedicalModal from "../ModalForms/CreateModals/CreateMedicalModal";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecordMedicalHistoryCard({ selectedPetId }) {
	const { data } = useGetMedicalHistoryQuery();
	const [deleteMedical] = useDeleteMedicalMutation();
	const [expanded, setExpanded] = React.useState(false);
	const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

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

	if (!data) {
		return <div>Loading...</div>;
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
										onClick={() => handleDelete(medical.id)}
									>
										<DeleteIcon />
									</IconButton>
								</div>
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
