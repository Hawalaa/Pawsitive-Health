import React from "react";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function UserProfileTopNav() {
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
					justifyContent: "flex-end",
					height: 100,
				}}
			>
				<List sx={{ display: "flex", width: 200 }}>
					<Button
						variant="text"
						sx={{
							color: "black",
							background: "#EBE09C",
							borderRadius: "50px",
							width: "100%",
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
