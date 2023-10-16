import React from "react";
import { useDeleteTokenMutation } from "../Store/Token";
import { useNavigate } from "react-router-dom";

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

	return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
