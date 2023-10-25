import React from "react";
import { useParams } from "react-router-dom";
import { useGetPetProfileDataQuery } from "../../Store/PetProfileApi";
import Navbar from "../Dashboard/Navbar";
import TopNavbar from "../Dashboard/TopNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Grid,
	Divider,
	Typography,
} from "@mui/material";

export default function ListPet() {
	const params = useParams(); // get id from URL parameters
	const { data } = useGetPetProfileDataQuery(params);
	const defaultPetPic =
		"https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png";

	if (data) {
		return (
			<>
				<div style={{ display: "flex" }}>
					<Navbar />
					<div
						style={{
							margin: 0,
							padding: 0,
							width: "100%",
							flexDirection: "column",
							display: "flex",
						}}
					>
						<TopNavbar />
						<div
							style={{
								display: "grid",
								height: "100%",
							}}
						>
							<Card
								sx={{
									minWidth: 275,
									m: 1,
									overflowY: "auto",
									backgroundColor:
										"rgba(255, 255, 255, 0.99)",
									boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
								}}
							>
								<CardContent sx={{ overflowY: "auto" }}>
									<h1 style={{ textAlign: "left" }}>
										Woof, woof {data.pet_name}!
									</h1>
									<Divider />
									<Grid container>
										<Grid item key={data.pet_id}>
											<ListItem>
												<ListItemAvatar
													sx={{ textAlign: "center" }}
												>
													<Avatar
														alt={data.name}
														src={
															data.pet_pic
																? data.pet_pic
																: defaultPetPic
														}
														sx={{
															width: 200,
															height: 200,
														}}
													/>
													<Typography variant="h5">
														{data.pet_name}
													</Typography>
												</ListItemAvatar>
											</ListItem>
											<ListItemText
												sx={{ textAlign: "center" }}
											>
												Breed: {data.breed}
											</ListItemText>
											<ListItemText
												sx={{ textAlign: "center" }}
											>
												Gender: {data.gender}
											</ListItemText>
											<ListItemText
												sx={{ textAlign: "center" }}
											>
												Age: {data.age}
											</ListItemText>
											<ListItemText
												sx={{ textAlign: "center" }}
											>
												Weight(lbs): {data.weight}
											</ListItemText>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</>
		);
	}
}
