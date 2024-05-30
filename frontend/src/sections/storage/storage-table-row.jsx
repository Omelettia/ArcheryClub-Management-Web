import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import axios from 'axios';

import Iconify from 'src/components/iconify';

export default function StorageTableRow({
  id,
  selected,
  name,
  equipment_imageUrl,
  renter,
  state,
  handleClick,
  onDeleteRow,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editState, setEditState] = useState(state);
  const [editRenter, setEditRenter] = useState(renter);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleStateChange = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleStateBlur = async () => {
    setIsEditing(false); // Exit edit mode
    // Send update request for state
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:3001/api/equipments/profile/${id}`, { state: editState }, config);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  const handleStateInputChange = (event) => {
    setEditState(event.target.value);
  };

  const handleRenterChange = async (event) => {
    const newRenter = event.target.value;
    setEditRenter(newRenter);
    setIsEditing(false); // Exit edit mode
    // Send update request for renter
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const user_id = newRenter === 'Available' ? null : renter.userId;
      await axios.put(`http://localhost:3001/api/equipments/profile/${id}`, { state, user_id }, config);
    } catch (error) {
      console.error('Error updating renter:', error);
    }
  };

  const handleDeleteClick = async () => {
    if (renter === 'Available') {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(`http://localhost:3001/api/equipments/${id}`, config);
        // Call the callback function to update the storage view
        onDeleteRow(id);
      } catch (error) {
        console.error('Error deleting equipment:', error);
      }
    } else {
      // Display error message if equipment is rented
      alert('Cannot delete equipment that is currently rented');
    }
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={equipment_imageUrl} />
          <Typography variant="subtitle2" noWrap>
            {id}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        {isEditing ? (
          <Select
            value={editRenter}
            onChange={handleRenterChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select renter' }}
          >
            {renter !== 'Available' && (
              <MenuItem value={renter}>{renter}</MenuItem>
            )}
            <MenuItem value="Available">Available</MenuItem>
          </Select>
        ) : (
          editRenter
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <TextField
            value={editState}
            onChange={handleStateInputChange} // Change handler for input
            onBlur={handleStateBlur}
          />
        ) : (
          editState
        )}
      </TableCell>

      <TableCell align="right">
        <IconButton onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={handleStateChange}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            {isEditing ? "Cancel" : "Edit"} {/* Change button text based on editing mode */}
          </MenuItem>

          <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      </TableCell>
    </TableRow>
  );
}

StorageTableRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  equipment_imageUrl: PropTypes.any,
  handleClick: PropTypes.func,
  onDeleteRow: PropTypes.func,
  renter: PropTypes.any,
  selected: PropTypes.any,
  state: PropTypes.string,
};
