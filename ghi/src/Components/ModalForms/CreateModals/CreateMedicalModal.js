import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel, TextareaAutosize } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCreateMedicalMutation } from "../../../Store/MedicalHistoryApi";
import { toast } from "react-toastify";

export default function CreateMedicalModal({ isOpen, onClose, selectedPetId }) {
	const navigate = useNavigate();
	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	const [prescriptions, setPrescriptions] = useState("");
	const [veterinarian, setVeterinarian] = useState("");
	const [createMedical] = useCreateMedicalMutation();

	const handleDateChange = (event) => {
		const value = event.target.value;
		setDate(value);
	};

	const handleVeterinarianChange = (event) => {
		const value = event.target.value;
		setVeterinarian(value);
	};

	const handlePrescriptionChange = (event) => {
		const value = event.target.value;
		setPrescriptions(value);
	};

	const handleDescriptionChange = (event) => {
		const value = event.target.value;
		setDescription(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newMedical = {
			date,
			description,
			prescriptions,
			veterinarian,
			pet_id: selectedPetId,
		};

		try {
			await createMedical({
				newMedical,
				petId: selectedPetId,
			}).unwrap();
			toast.success("A new Medical record has been created!");
			navigate("/records");
		} catch (err) {
			toast.error("Unable to create a new Medical record");
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
				<h2>Add a Medical Record</h2>
				<InputLabel>Date</InputLabel>
				<TextField
					type="date"
					value={date}
					onChange={handleDateChange}
					fullWidth
				/>
				<InputLabel>Veterinarian</InputLabel>
				<TextField
					type="text"
					value={veterinarian}
					onChange={handleVeterinarianChange}
					fullWidth
				/>
				<InputLabel>Prescription(s)</InputLabel>
				<TextField
					value={prescriptions}
					onChange={handlePrescriptionChange}
					fullWidth
				/>
				<InputLabel>Description</InputLabel>
				<Box sx={{ width: "100%" }}>
					<TextareaAutosize
						minRows={3} // You can adjust the number of rows as needed
						value={description}
						onChange={handleDescriptionChange}
						sx={{ resize: "vertical", width: "100%" }}
					/>
				</Box>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					Create
				</Button>
			</Box>
		</Modal>
	);
}
