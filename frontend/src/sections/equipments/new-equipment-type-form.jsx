import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function NewEquipmentTypeForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    purchasing_price: '',
    renting_price: '',
    category: '',
    equipment_image: '',
    skill_level: '',
    created_at: '',
  });

  const [errorMessage, setErrorMessage] = useState(null); // State variable to hold the error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate purchasing_price and renting_price as floats
      const purchasingPrice = parseFloat(formData.purchasing_price);
      const rentingPrice = parseFloat(formData.renting_price);
  
      // Check if either purchasing_price or renting_price is not a valid float
      if (Number.isNaN(purchasingPrice) || Number.isNaN(rentingPrice)) {
        throw new Error('Purchasing price and renting price must be valid numbers.');
      }
      formData.created_at = new Date();
      // Continue with form submission if validation passes
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('http://localhost:3001/api/equipmentTypes/', formData, config);
      
      // If successful, pass the new equipment data to the parent component
      onSubmit(response.data); // Trigger the onSubmit function provided by the parent component with the new equipment data
      onClose();
    } catch (error) {
      // If there's an error, set the errorMessage state to display the message
      setErrorMessage(error.message);
      console.error('Error creating new equipment type:', error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Equipment Type</DialogTitle>
      <DialogContent>
        {errorMessage && ( // Display error message if errorMessage state is not null
          <div style={{ color: 'red', marginBottom: 10 }}>
            {errorMessage}
          </div>
        )}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Purchasing Price"
          name="purchasing_price"
          value={formData.purchasing_price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Renting Price"
          name="renting_price"
          value={formData.renting_price}
          onChange={handleChange}
        />
        <Select
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Category
          </MenuItem>
          <MenuItem value="Bow">Bow</MenuItem>
          <MenuItem value="Field">Field</MenuItem>
          <MenuItem value="Axe">Axe</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
        </Select>
        <TextField
          fullWidth
          label="Equipment Image URL"
          name="equipment_image"
          value={formData.equipment_image}
          onChange={handleChange}
        />
        <Select
          fullWidth
          label="Skill Level"
          name="skill_level"
          value={formData.skill_level}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Skill Level
          </MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Master">Master</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

NewEquipmentTypeForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
