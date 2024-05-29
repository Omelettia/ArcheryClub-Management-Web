import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NewEventForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    event_image: '',
    starting_date: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const dataToSend = {
        ...formData,
        creator_id: decodedToken.id,
        participatable: true,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:3001/api/events/', dataToSend, config);

      onSubmit();
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error creating new event:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New Event</DialogTitle>
      <DialogContent>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</div>
        )}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }} // Add margin bottom to create space
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          sx={{ mb: 2 }} // Add margin bottom to create space
        />
        <TextField
          fullWidth
          label="Event Image URL"
          name="event_image"
          value={formData.event_image}
          onChange={handleChange}
          sx={{ mb: 2 }} // Add margin bottom to create space
        />
        <TextField
          fullWidth
          type="date"
          label="Starting Date"
          name="starting_date"
          value={formData.starting_date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }} // Add margin bottom to create space
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

NewEventForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
