import React from "react";
import { useDeleteTokenMutation } from "../Store/Token";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Logout = () => {
	const navigate = useNavigate();
	const [deleteToken] = useDeleteTokenMutation();

	const handleLogout = async () => {
		try {
			await deleteToken();
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
