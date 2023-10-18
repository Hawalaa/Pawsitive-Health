import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useDeleteTokenMutation } from "../../Store/Token";
import pawsitiveHealth from "../../assets/pawsitiveHealth.png";
import dogSilhouette from "../../assets/dogSilhouette.png";

const Navbar = () => {
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
		<Drawer
			sx={{
				width: 240,
				flexShrink: 0,
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				"& .MuiDrawer-paper": {
					width: 240,
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					height: "100%",
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<Paper
				sx={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					justifyContent: "space-between",
					background: "#EBA96F",
					overflow: "hidden",
				}}
			>
				<List sx={{ width: "100%", textAlign: "center" }}>
					<ListItem>
						<img
							src={pawsitiveHealth}
							alt="Pawsitive Health"
							style={{
								width: 245,
								height: 150,
								transform: "translateX(-23px)",
								paddingBottom: "50px",
							}}
						/>
					</ListItem>
					<Button
						variant="text"
						sx={{
							color: "black",
							backgroundColor: "#EBE09C",
							borderRadius: "50px",
							width: "80%",
							marginBottom: "10px",
						}}
						component={Link}
						to="/dashboard"
					>
						<ListItemText
							primary="Dashboard"
							sx={{ textAlign: "center" }}
						/>
					</Button>
					<Button
						variant="text"
						sx={{
							color: "black",
							backgroundColor: "#EBE09C",
							borderRadius: "50px",
							width: "80%",
							marginBottom: "10px",
						}}
						component={Link}
						to="/activities"
					>
						<ListItemText
							primary="Activities"
							sx={{ textAlign: "center" }}
						/>
					</Button>
					<Button
						component={Link}
						to="/records"
						variant="text"
						sx={{
							color: "black",
							backgroundColor: "#EBE09C",
							borderRadius: "50px",
							width: "80%",
						}}
					>
						<ListItemText
							primary="Records"
							sx={{ textAlign: "center" }}
						/>
					</Button>
				</List>
				<List>
					<img
						src={dogSilhouette}
						style={{ width: 800, transform: "translateY(50px)" }}
						alt=""
					/>
				</List>
				<List sx={{ width: "100%", textAlign: "center" }}>
					<Button
						variant="text"
						onClick={handleLogout}
						sx={{
							color: "black",
							backgroundColor: "#EBE09C",
							borderRadius: "50px",
							width: "80%",
						}}
					>
						<ListItemText primary="Logout" />
					</Button>
				</List>
			</Paper>
		</Drawer>
	);
};

export default Navbar;
