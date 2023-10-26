import React, { useState, useEffect } from "react";
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
	const [dogSilhouetteWidth, setDogSilhouetteWidth] = useState(800);

	const handleResize = () => {
		const windowHeight = window.innerHeight;
		const aspectRatio = 1.5;
		const newWidth = windowHeight / aspectRatio;
		setDogSilhouetteWidth(newWidth);
	};

	useEffect(() => {
		// Add a window resize event listener
		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

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
					<ListItem sx={{ display: "flex" }}>
						<img
							src={pawsitiveHealth}
							alt="Pawsitive Health"
							style={{
								width: 245,
								height: 150,
								paddingBottom: "50px",
							}}
						/>
					</ListItem>
					<Button
						variant="text"
						sx={{
							color: "black",
							background: "#EBE09C",
							borderRadius: "50px",
							width: "90%",
							marginBottom: "10px",
							"&:hover": {
								background: "#EBE09C",
								border: "1px solid black",
							},
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
							background: "#EBE09C",
							borderRadius: "50px",
							width: "90%",
							marginBottom: "10px",
							"&:hover": {
								background: "#EBE09C",
								border: "1px solid black",
							},
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
							background: "#EBE09C",
							borderRadius: "50px",
							width: "90%",
							marginBottom: "10px",
							"&:hover": {
								background: "#EBE09C",
								border: "1px solid black",
							},
						}}
					>
						<ListItemText
							primary="Records"
							sx={{ textAlign: "center" }}
						/>
					</Button>
				</List>
				<List sx={{ flexShrink: 1 }}>
					<img
						src={dogSilhouette}
						style={{
							width: `${dogSilhouetteWidth}px`,
							height: "auto",
							transform: "translateY(50px)",
						}}
						alt=""
					/>
				</List>
				<List
					sx={{
						width: "100%",
						textAlign: "center",
					}}
				>
					<Button
						variant="text"
						onClick={handleLogout}
						sx={{
							color: "black",
							background: "#EBE09C",
							borderRadius: "50px",
							width: "90%",
							marginBottom: "10px",
							"&:hover": {
								background: "#EBE09C",
								border: "1px solid black",
							},
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
