import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCreateImmunizationMutation } from "../../../Store/ImmunizationApi";
import { toast } from "react-toastify";

export default function AddImmunizationModal({
	isOpen,
	onClose,
	selectedPetId,
}) {
	const navigate = useNavigate();
	const [dateValidUntil, setDateValidUntil] = useState("");
	const [vaccination, setVaccination] = useState("");
	const [dateReceived, setDateReceived] = useState("");
	const [createImmunization] = useCreateImmunizationMutation();

	const handleDateValidUntilChange = (event) => {
		const value = event.target.value;
		setDateValidUntil(value);
	};

	const handleVaccinationChange = (event) => {
		const value = event.target.value;
		setVaccination(value);
	};

	const handleDateReceived = (event) => {
		const value = event.target.value;
		setDateReceived(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newImmunization = {
			vaccination: vaccination,
			date_valid_until: dateValidUntil,
			date: dateReceived,
			pet_id: selectedPetId,
		};

		try {
			await createImmunization({
				newImmunization: newImmunization,
				pet_id: selectedPetId,
			}).unwrap();
			toast.success("A new Immunization record has been created!");
			navigate("/records");
		} catch (err) {
			toast.error(
				"An error occurred while creating a new Immunization record"
			);
		}

		onClose();
	};

	return (
		<Modal open={isOpen} onClose={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					border: "2px solid #000",
					boxShadow: 24,
					p: 4,
				}}
			>
				<h2>Add an Immunization Record</h2>
				<InputLabel>Name of Vaccination</InputLabel>
				<TextField
					type="text"
					value={vaccination}
					onChange={handleVaccinationChange}
					fullWidth
					sx={{ paddingBottom: "10px" }}
				/>
				<InputLabel>Date Received</InputLabel>
				<TextField
					type="date"
					value={dateReceived}
					onChange={handleDateReceived}
					fullWidth
					sx={{ paddingBottom: "10px" }}
				/>
				<InputLabel>Date Valid Until</InputLabel>
				<TextField
					type="date"
					value={dateValidUntil}
					onChange={handleDateValidUntilChange}
					fullWidth
					sx={{ paddingBottom: "10px" }}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					sx={{ width: "100%" }}
				>
					Create
				</Button>
			</Box>
		</Modal>
	);
}
