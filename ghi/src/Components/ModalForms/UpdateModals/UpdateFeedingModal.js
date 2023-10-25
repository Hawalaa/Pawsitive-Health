import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useUpdateFeedingMutation } from "../../../Store/FeedingHistoryApi";
import { toast } from "react-toastify";

export default function UpdateFeedingRecordModal({
	isOpen,
	onClose,
	selectedPetId,
	feeding_id,
}) {
	const navigate = useNavigate();
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [foodType, setFoodType] = useState("");
	const [amount, setAmount] = useState("");
	const [updateFeedingMutation] = useUpdateFeedingMutation();

	const handleDateChange = (event) => {
		const value = event.target.value;
		setDate(value);
	};

	const handleTimeChange = (event) => {
		const value = event.target.value;
		setTime(value);
	};

	const handleFoodTypeChange = (event) => {
		const value = event.target.value;
		setFoodType(value);
	};

	const handleAmountChange = (event) => {
		const value = event.target.value;
		setAmount(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const updatedFeeding = {
			date,
			time,
			food_type: foodType,
			amount,
			pet_id: selectedPetId,
		};

		try {
			await updateFeedingMutation({
				updatedFeeding,
				petId: selectedPetId,
				feeding_id: feeding_id,
			}).unwrap();
			toast.success("Feeding has been updated!");
			navigate("/activities");
		} catch (err) {
			toast.error("Unable to update feeding");
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
				<h2>Update Feeding Record</h2>
				<InputLabel>Date</InputLabel>
				<TextField
					type="date"
					value={date}
					onChange={handleDateChange}
					fullWidth
				/>
				<InputLabel>Time</InputLabel>
				<TextField
					type="time"
					value={time}
					onChange={handleTimeChange}
					fullWidth
				/>
				<InputLabel>Food Type</InputLabel>
				<TextField
					value={foodType}
					onChange={handleFoodTypeChange}
					fullWidth
				/>
				<InputLabel>Amount(Cup)</InputLabel>
				<TextField
					type="number"
					value={amount}
					onChange={handleAmountChange}
					fullWidth
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					Update
				</Button>
			</Box>
		</Modal>
	);
}
