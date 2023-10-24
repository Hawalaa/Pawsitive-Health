import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputLabel, Select, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useUpdatePoopMutation } from '../../../Store/PoopHealthApi';
import { toast } from "react-toastify";

export default function UpdatePoopRecordModal({ isOpen, onClose, selectedPetId, poop_id }) {
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [consistency, setConsistency] = useState('');
    const [updatePoopMutation] = useUpdatePoopMutation();

    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    };

    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    };

    const handleConsistencyChange = (event) => {
        const value = event.target.value;
        setConsistency(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedPoop = {
            date,
            time,
            consistency,
            pet_id: selectedPetId,
        };
        console.log(updatedPoop)

        try {
            const response = await updatePoopMutation({ updatedPoop, petId: selectedPetId, poop_id: poop_id }).unwrap();
            console.log(poop_id)
            console.log('Update response:', response);
            toast.success("Poop has been updated!");
            navigate("/activities");
            } catch (err) {
            console.log("handleSubmit error", err);
        }

        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                <h2>Update Poop Record</h2>
                <InputLabel>Date</InputLabel>
                <TextField type="date" value={date} onChange={handleDateChange} fullWidth />
                <InputLabel>Time</InputLabel>
                <TextField type='time' value={time} onChange={handleTimeChange} fullWidth />
                <InputLabel>Consistency</InputLabel>
                <Select
                    labelId="selectConsistency"
                    id="selectConsistency"
                    value={consistency}
                    onChange={handleConsistencyChange}
                    fullWidth
                >
                    <MenuItem value="Firm">Firm</MenuItem>
                    <MenuItem value="Liquid">Liquid</MenuItem>
                    <MenuItem value="Soft">Soft</MenuItem>
                </Select>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
            </Box>
        </Modal>
    );
};
