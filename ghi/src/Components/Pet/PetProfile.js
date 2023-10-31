import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPetProfileDataQuery } from "../../Store/PetProfileApi";
import Navbar from "../Dashboard/Navbar";
import UserProfileTopNav from "../User/UserProfileTopNav";
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
	Button,
	Dialog,
	DialogTitle,
	DialogContent} from '@mui/material';
import UpdatePetModal from "../ModalForms/UpdateModals/UpdatePetModal";
import {useDeletePetProfileMutation} from "../../Store/UserProfileApi";
import { toast } from "react-toastify";

export default function ListPet(onClose) {
	const params = useParams(); // get id from URL parameters
	const { data } = useGetPetProfileDataQuery(params);
	const defaultPetPic = "https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png";
	const [DeletePetProfileMutation] = useDeletePetProfileMutation();
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updatedValue, setUpdatedValue] = useState("");
	const navigate = useNavigate();

	if (!data) {
		return <div>Loading...</div>;
	}


	const handleDeleteClick = () => {
		setIsDeleteConfirmationOpen(true);
	};

	const handleDeleteCancel = () => {
		setIsDeleteConfirmationOpen(false);
	};

	const handleDeleteConfirm = async () => {
		try {
			await DeletePetProfileMutation(params);
			toast.success("Pet profile has been deleted");
			navigate("/user");
		}catch (err) {
			toast.error("Unable to delete pet profile!");
		}
		setIsDeleteConfirmationOpen(false);
		onClose();
	};

	const handleOpenModal = () => {
    setIsModalOpen(true);
	};

	const handleCloseModal = () => {
    setIsModalOpen(false);
	};

	const handleUpdatedValue = async (updatedValue) => {
    setUpdatedValue(updatedValue);
	};

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
						<UserProfileTopNav />
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
										<Grid item key={data.id}>
											<ListItem>
												<ListItemAvatar
													sx={{ textAlign: "center" }}
												>
													<Avatar
														alt={data.pet_name}
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
										<ListItem>
									<Button variant="contained" onClick={handleOpenModal}>EDIT {data.pet_name}</Button>
									<UpdatePetModal
										open={isModalOpen}
										onClose={handleCloseModal}
										onUpdate={handleUpdatedValue}
										updatedValue={updatedValue}
										params={params}
										initialValue={{
											name: data.pet_name,
											breed: data.breed,
											gender: data.gender,
											age: data.age,
											weight: data.weight,
											pet_pic: data.pet_pic
										}}
									/>
								</ListItem>
								<ListItem>
									<Button
									variant="contained"
									color="secondary"
									onClick={handleDeleteClick}
									style={{ marginTop: "20px" }}
									>
									Delete {data.pet_name}
									</Button>
								</ListItem>
								<Dialog
									open={isDeleteConfirmationOpen}
									onClose={handleDeleteCancel}
									fullWidth
									>
									<DialogTitle>Confirm Deletion</DialogTitle>
									<DialogContent>
										Are you sure you want to delete {data.pet_name}?
									</DialogContent>
										<div style={{ padding: "20px", textAlign: "right"}}>
											<Button variant="contained" onClick={handleDeleteConfirm} color="secondary">
												Delete {data.pet_name}
											</Button>
											<Button variant="outlined" onClick={handleDeleteCancel} color="secondary">
												Cancel
											</Button>
										</div>
								</Dialog>
						</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</>
		);
	}
}
