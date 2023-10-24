import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputLabel, Select, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useCreatePetDataMutation } from '../../../Store/UserProfileApi';
import { toast } from "react-toastify";

export default function AddPetModal({ isOpen, onClose, userId }) {
    const navigate = useNavigate();
    const [petName, setPetName] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [petPic, setPetPic] = useState("");
    const [createPetMutation] = useCreatePetDataMutation();

    const handlePetNameChange = (event) => {
        const value = event.target.value;
        setPetName(value);
    };

    const handleBreedChange = (event) => {
        const value = event.target.value;
        setBreed(value);
    };

    const handleGenderChange = (event) => {
        const value = event.target.value;
        setGender(value);
    };

    const handleAgeChange = (event) => {
        const value = event.target.value;
        setAge(value);
    };

    const handleWeightChange = (event) => {
        const value = event.target.value;
        setWeight(value);
    };

    const handlePetPicChange = (event) => {
        const value = event.target.value;
        setPetPic(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPet = {
            pet_name: petName,
            breed,
            gender,
            age: parseInt(age),
            weight: parseInt(weight),
            pet_pic: petPic || "",
            user_id: userId,
        };
        console.log(newPet)

        try {
            await createPetMutation({ newPet, id: userId }).unwrap();
            toast.success("A new pet has been created!");
            navigate("/user");
            } catch (err) {
            console.log("handleSubmit error", err);
        }

        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                <h2>Add a Pet</h2>
                <InputLabel>Pet Name</InputLabel>
                <TextField type="text" value={petName} onChange={handlePetNameChange} fullWidth />
                <InputLabel>Breed</InputLabel>
                <TextField type='text' value={breed} onChange={handleBreedChange} fullWidth />
                <InputLabel>Gender</InputLabel>
                <Select
                    labelId="selectGender"
                    id="selectGender"
                    value={gender}
                    onChange={handleGenderChange}
                    fullWidth
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
                <InputLabel>Age</InputLabel>
                <TextField type="number" value={age} onChange={handleAgeChange} fullWidth />
                <InputLabel>Weight</InputLabel>
                <TextField type="number" value={weight} onChange={handleWeightChange} fullWidth />
                <InputLabel>Picture of your pet</InputLabel>
                <TextField type="text" value={petPic} onChange={handlePetPicChange} fullWidth />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Create</Button>
            </Box>
        </Modal>
    );
};
