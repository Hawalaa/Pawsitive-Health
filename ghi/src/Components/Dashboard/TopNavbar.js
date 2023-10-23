import React from "react";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import PetDropdown from "./PetDropdown";
import { Link } from "react-router-dom";

export default function TopNavbar({ onPetChange }) {
	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "row",
				background: "#BB7843",
			}}
		>
			<Toolbar
				sx={{
					flex: 1,
					justifyContent: "space-between",
					height: 100,
				}}
			>
				<List sx={{ display: "flex" }}>
					<ListItem>
						<PetDropdown onPetChange={onPetChange} />
					</ListItem>
				</List>
				<List sx={{ display: "flex", width: 200 }}>
					<Button
						variant="text"
						sx={{
							color: "black",
							background: "#EBE09C",
							borderRadius: "50px",
							width: "100%",
							"&:hover": {
								background: "#EBE09C",
								border: "1px solid black",
							},
						}}
						component={Link}
						to="/user"
					>
						<ListItemText
							primary="Profile"
							sx={{ textAlign: "center" }}
						/>
					</Button>
				</List>
			</Toolbar>
		</Paper>
	);
}
