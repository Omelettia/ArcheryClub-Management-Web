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

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  isAdmin,
  isStaff,
  role_admin,
  role_staff,
  selected,
  name,
  avatarUrl,
  point,
  rank,
  handleClick,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPoint, setEditPoint] = useState(point);
  const [editRole, setEditRole] = useState(() => {
    if (role_admin) return 'Admin';
    if (role_staff) return 'Staff';
    return 'Member';
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); 
    console.log("staff", isStaff);
  };

  const handlePointChange = (event) => {
    setEditPoint(event.target.value);
  };

  const handleRoleChange = (event) => {
    setEditRole(event.target.value);
  };

  const handleBlur = async () => {
    setIsEditing(false); // Exit edit mode
    // Send update request for point or role
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isStaff && isEditing) {
        if (editPoint !== point) { // Check if the point has changed
          await axios.put(`http://localhost:3001/api/users/point/${id}`, { points: editPoint }, config);
        }
      }
      
      if (isAdmin && isEditing) {
        if ((editRole === 'Staff' && !role_staff) || (editRole === 'Member' && role_staff)) { // Check if the role has changed
          await axios.put(`http://localhost:3001/api/users/${name}`, { staff: editRole === 'Staff' }, config);
        }
      }
      
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const renderRole = () => {
    if (role_admin) return 'Admin';
    if (role_staff) return 'Staff';
    return 'Member';
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{rank}</TableCell>
        <TableCell>
          {isEditing && isStaff ? (
            <TextField
              value={editPoint}
              onChange={handlePointChange}
              onBlur={handleBlur}
            />
          ) : (
            editPoint
          )}
        </TableCell>
        <TableCell>
          {isEditing && isAdmin && !role_admin ? (
            <Select value={editRole} onChange={handleRoleChange} onBlur={handleBlur}>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Member">Member</MenuItem>
            </Select>
          ) : (
            <Typography variant="body2">{renderRole()}</Typography>
          )}
        </TableCell>
        {isStaff && (
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
            <MenuItem onClick={handleEditClick}>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              {isEditing ? 'Cancel' : 'Edit'}
            </MenuItem>
          </Popover>          
        </TableCell>
        )}
      </TableRow>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  isStaff: PropTypes.bool,
  selected: PropTypes.bool,
  role_admin: PropTypes.bool,
  role_staff: PropTypes.bool,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  point: PropTypes.number,
  rank: PropTypes.string,
  handleClick: PropTypes.func,
};
