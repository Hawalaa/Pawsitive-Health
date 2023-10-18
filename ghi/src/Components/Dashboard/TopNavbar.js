import React from "react";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import PetDropdown from "./PetDropdown";

export default function TopNavbar() {
	return (
		<Paper sx={{ display: "flex", flexDirection: "row" }}>
			<Toolbar
				sx={{
					flex: 1,
					justifyContent: "space-between",
					height: 100,
				}}
			>
				<List sx={{ display: "flex" }}>
					<ListItem>
						<PetDropdown />
					</ListItem>
				</List>
				<List sx={{ display: "flex", height: "100%" }}>
					<Button variant="text">
						<ListItemText primary="Profile" />
					</Button>
				</List>
			</Toolbar>
		</Paper>
	);
}
