import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NewUserForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    phonenumber: '',
    address: '',
    profile_image: '',
  });
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (formData.password !== confirmedPassword) {
        throw new Error('Passwords do not match');
      }

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:3001/api/users/', formData, config);
      
      onSubmit();
      onClose();
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error creating new user:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>New User</DialogTitle>
      <DialogContent>
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            {errorMessage}
          </div>
        )}
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmedPassword}
          onChange={handleConfirmPasswordChange}
        />
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Phone Number"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Profile Image URL"
          name="profile_image"
          value={formData.profile_image}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

NewUserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
