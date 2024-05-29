import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material'; // Import Box for custom styling

export default function NewEquipmentForm({ open, onClose, onSubmit }) {
  const [equipmentType, setEquipmentType] = useState(null);
  const [state, setState] = useState('');
  const [equipmentTypeOptions, setEquipmentTypeOptions] = useState([]);

  const handleSearch = async (event) => {
    const query = event.target.value;
    if (query.length > 0) {
      try {
        const response = await axios.get(`http://localhost:3001/api/equipmentTypes/search?query=${query}`);
        setEquipmentTypeOptions(response.data);
      } catch (error) {
        console.error('Error fetching equipment types:', error);
      }
    } else {
      setEquipmentTypeOptions([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const newEquipment = {
        equipmentTypeId: equipmentType.id,  // Send the ID, not the name
        state,
      };
      await axios.post('http://localhost:3001/api/equipments/', newEquipment, config);
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error adding new equipment:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>New Equipment</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Autocomplete
            options={equipmentTypeOptions}
            getOptionLabel={(option) => option.name}
            value={equipmentType}
            onChange={(event, newValue) => setEquipmentType(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Equipment Type"
                onChange={handleSearch}
                fullWidth
                margin="normal"
              />
            )}
            renderOption={(props, option) => (
              <ListItem {...props}>
                <ListItemAvatar>
                  <Avatar src={option.equipment_image} />
                </ListItemAvatar>
                <ListItemText primary={option.name} />
              </ListItem>
            )}
          />
          <TextField
            fullWidth
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

NewEquipmentForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
