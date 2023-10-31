import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, InputLabel, Button } from "@mui/material";
import { toast } from "react-toastify";
import {
	useUpdatePetProfileMutation,
} from "../../../Store/PetProfileApi"
import { useNavigate } from "react-router-dom";


export default function UpdatePet({ open, onClose, onUpdate, params, initialValue}) {
    const [updateName, setUpdateName] = useState('');
    const [updateBreed, setUpdateBreed] = useState('');
    const [updateGender, setUpdateGender] = useState('');
    const [updateAge, setUpdateAge] = useState('');
    const [updateWeight, setUpdateWeight] = useState('');
    const [updatePetPic, setUpdatePetPic] = useState("");
    const [UpdatePetProfileMutation] = useUpdatePetProfileMutation();
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setUpdateName(e.target.value);
    };

    const handleBreedChange = (e) => {
    setUpdateBreed(e.target.value);
    };

    const handleGenderChange = (e) => {
    setUpdateGender(e.target.value);
    };

    const handleAgeChange = (e) => {
    setUpdateAge(e.target.value);
    };

    const handleWeightChange = (e) => {
    setUpdateWeight(e.target.value);
    };

    const handlePetPicChange = (e) => {
        const value = e.target.value;
        setUpdatePetPic(value);
    };

    const handleSubmit = async (e) => {
		e.preventDefault();

    const updatedPetProfile = {
        pet_name: updateName,
        breed: updateBreed,
        gender: updateGender,
        age: updateAge,
        weight: updateWeight,
        pet_pic: updatePetPic || "",
        user_id: params.id,
    };
    try {
        await UpdatePetProfileMutation({
            updatedPetProfile,
            id: params.id,
            pet_id: params.pet_id,
        }).unwrap();
        toast.success("Pet profile has been updated!");
        navigate(`/user/${params.id}/pet/${params.pet_id}`);
        } catch (err) {
        toast.error("Unable to update pet profile");
    }
        onUpdate(updatedPetProfile);
        onClose();
    };

    useEffect(() => {
        // Set initial values when the modal is opened so user won't have to retype everything
        if (initialValue) {
            setUpdateName(initialValue.name);
            setUpdateBreed(initialValue.breed);
            setUpdateGender(initialValue.gender);
            setUpdateAge(initialValue.age);
            setUpdateWeight(initialValue.weight);
        }
    }, [initialValue]);

    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update Pet</DialogTitle>
        <DialogContent>
            <TextField
            fullWidth
            label="Update Name"
            variant="outlined"
            value={updateName}
            onChange={handleNameChange}
            margin="normal"
            />
            <TextField
            fullWidth
            label="Update Breed"
            variant="outlined"
            value={updateBreed}
            onChange={handleBreedChange}
            margin="normal"
            />
            <InputLabel>Update Gender</InputLabel>
            <Select
            fullWidth
            variant="outlined"
            value={updateGender}
            onChange={handleGenderChange}
            >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            </Select>
            <TextField
            fullWidth
            type="number"
            label="Update Age"
            variant="outlined"
            value={updateAge}
            onChange={handleAgeChange}
            margin="normal"
            />
            <TextField
            fullWidth
            type="number"
            label="Update Weight(lbs.)"
            variant="outlined"
            value={updateWeight}
            onChange={handleWeightChange}
            margin="normal"
            />
            <TextField
            fullWidth
            type="text"
            label="Update Pet picture"
            variant="outlined"
            value={updatePetPic}
            onChange={handlePetPicChange}
            margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: "20px", width: "100%" }}>
            Update
            </Button>
        </DialogContent>
        </Dialog>
    );
}
