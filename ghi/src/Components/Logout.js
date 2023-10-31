import React from "react";
import { useDeleteTokenMutation } from "../Store/Token";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { clearSelectedPet } from "../Store/petSelectionSlice";

const Logout = () => {
	const navigate = useNavigate();
	const [deleteToken] = useDeleteTokenMutation();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await deleteToken();
			dispatch(clearSelectedPet());
		} catch (error) {
			console.error("Logout failed", error);
		}

		navigate("/login");
	};

	return (
		<Button variant="text" onClick={handleLogout}>
			Logout
		</Button>
	);
};

export default Logout;
