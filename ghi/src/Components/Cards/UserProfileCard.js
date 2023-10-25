import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	Grid,
	Divider,
	Typography,
	Button,
} from "@mui/material";
import { useGetUserProfileDataQuery } from "../../Store/UserProfileApi";
import AddPetModal from "../ModalForms/CreateModals/CreatePetModal";
import { Link } from "react-router-dom";

export default function UserProfileCard() {
	const { data } = useGetUserProfileDataQuery();
	const defaultPetPic =
		"https://cdn2.iconfinder.com/data/icons/veterinary-12/512/Veterinary_Icons-16-512.png";
	const addPetIcon =
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9vq4M0Rag2NXCXiFJdeI55VwhHLI4qBXXdw&usqp=CAU";
	const userId = data[0].user_id;
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

	function capitalizeLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	if (data && data[0].pets !== null) {
		return (
			<Card
				sx={{
					minWidth: 275,
					m: 1,
					overflowY: "auto",
					backgroundColor: "rgba(255, 255, 255, 0.99)",
					boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
				}}
			>
				<CardContent sx={{ overflowY: "auto" }}>
					<p style={{ fontSize: "44px", textAlign: "left" }}>
						Hi {capitalizeLetter(data[0].first_name)}{" "}
						{capitalizeLetter(data[0].last_name)}!
					</p>
					<Divider />
					<p style={{ fontSize: "40px", textAlign: "left" }}>
						My Pets
					</p>
					<Grid container spacing={5}>
						{data[0].pets.map((pet) => (
							<Grid item key={pet.pet_id}>
								<ListItem>
									<Button
										component={Link}
										to={`/user/${userId}/pet/${pet.pet_id}`}
									>
										<ListItemAvatar
											sx={{ textAlign: "center" }}
										>
											<Avatar
												alt={pet.name}
												src={
													pet.pet_pic
														? pet.pet_pic
														: defaultPetPic
												}
												sx={{ width: 200, height: 200 }}
											/>
											<Typography
												variant="h5"
												sx={{ color: "black" }}
											>
												{pet.pet_name}
											</Typography>
										</ListItemAvatar>
									</Button>
								</ListItem>
							</Grid>
						))}
						<Button onClick={openCreateModal}>
							<Avatar
								alt="Add a Pet"
								src={addPetIcon}
								sx={{ width: 200, height: 200 }}
							/>
						</Button>
						<AddPetModal isOpen={isCreateModalOpen} onClose={closeCreateModal} userId={data[0].user_id}/>
					</Grid>
				</CardContent>
			</Card>
		);
	} else {
		return (
			<Card
				sx={{
					minWidth: 275,
					m: 1,
					overflowY: "auto",
					backgroundColor: "rgba(255, 255, 255, 0.99)",
					boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
				}}
			>
				<CardContent sx={{ overflowY: "auto" }}>
					<p style={{ fontSize: "44px", textAlign: "left" }}>
						Hi {data[0].username}!
					</p>
					<Divider />
					<p style={{ fontSize: "40px", textAlign: "left" }}>
						My Pets
					</p>
					<Grid container>
						<Typography variant="h6">
							Use the button below to add a pet!
						</Typography>
					</Grid>
					<Grid>
						<Button onClick={openCreateModal}>
							<Avatar
								alt="Add a Pet"
								src={addPetIcon}
								sx={{ width: 200, height: 200 }}
							/>
						</Button>
						<AddPetModal isOpen={isCreateModalOpen} onClose={closeCreateModal} userId={data[0].user_id}/>
					</Grid>
				</CardContent>
			</Card>
		);
	}
}
