import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from 'src/components/iconify';
import LoadingButton from '@mui/lab/LoadingButton';

export default function EquipmentDetailsView({ isStaff }) {
  const { equipmentTypeId } = useParams();
  const [equipmentType, setEquipmentType] = useState(null);
  const [isEditing, setIsEditing] = useState({
    editing: false,
    equipment_image: false,
  });
  const [imageUrlDialogOpen, setImageUrlDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchEquipmentType = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/equipmentTypes/${equipmentTypeId}`);
        setEquipmentType(response.data);
      } catch (error) {
        console.error('Error fetching equipment type:', error);
      }
    };

    fetchEquipmentType();
  }, [equipmentTypeId]);

  const handleChange = (field, value) => {
    setEquipmentType((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the authentication token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      };
      await axios.put(`http://localhost:3001/api/equipmentTypes/profile/${equipmentTypeId}`, equipmentType,config);
      setIsEditing({
        editing:false,
        equipment_image: false
      });
    } catch (error) {
      console.error('Error saving equipment type:', error);
    }
  };

  const handleImageUrlDialogOpen = () => {
    setImageUrlDialogOpen(true);
  };

  const handleImageUrlDialogClose = () => {
    setImageUrlDialogOpen(false);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageUrlSave = async () => {
    handleChange('equipment_image', imageUrl);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:3001/api/equipmentTypes/profile/${equipmentTypeId}`, equipmentType, config);
      handleImageUrlDialogClose();
    } catch (error) {
      console.error('Error saving equipment image URL:', error);
    }
  };

  if (!equipmentType) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/equipments"> {/* Use Link to navigate back to equipments */}
          <IconButton aria-label="back" sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant="h4" sx={{ mr: 'auto' }}>
          Equipment Details
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Box sx={{ flex: '1', p: 2 }}>
          <Card sx={{ p: 2, mb: 2 }}>
          {isEditing.editing ? (
              <TextField
                fullWidth
                label="Name"
                value={equipmentType.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => setIsEditing((prev) => ({ ...prev, editing: false }))}
              />
            ) : (
              <Typography variant="h6" gutterBottom>
                {equipmentType.name}{' '}
                {isStaff && (
                  <IconButton size="small" onClick={() => setIsEditing((prev) => ({ ...prev, editing: true }))}>
                    <Iconify icon="eva:edit-fill" />
                  </IconButton>
                )}
              </Typography>
            )}
            {isEditing.editing ? (
              <TextField
                fullWidth
                label="Description"
                value={equipmentType.description}
                onChange={(e) => handleChange('description', e.target.value)}
                onBlur={() => setIsEditing((prev) => ({ ...prev, editing: false }))}
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                {equipmentType.description}{' '}
                {isStaff && (
                  <IconButton size="small" onClick={() => setIsEditing((prev) => ({ ...prev, editing: true }))}>
                    <Iconify icon="eva:edit-fill" />
                  </IconButton>
                )}
              </Typography>
            )}
            {isEditing.editing ? (
              <TextField
                fullWidth
                label="Purchasing Price"
                value={equipmentType.purchasing_price}
                onChange={(e) => handleChange('purchasing_price', e.target.value)}
                onBlur={() => setIsEditing((prev) => ({ ...prev, editing: false }))}
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                Purchasing Price: {equipmentType.purchasing_price}{' '}
                {isStaff && (
                  <IconButton
                    size="small"
                    onClick={() => setIsEditing((prev) => ({ ...prev, editing: true }))}
                  >
                    <Iconify icon="eva:edit-fill" />
                  </IconButton>
                )}
              </Typography>
            )}
            {isEditing.editing ? (
              <TextField
                fullWidth
                label="Renting Price"
                value={equipmentType.renting_price}
                onChange={(e) => handleChange('renting_price', e.target.value)}
                onBlur={() => setIsEditing((prev) => ({ ...prev, editing: false }))}
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                Renting Price: {equipmentType.renting_price}{' '}
                {isStaff && (
                  <IconButton
                    size="small"
                    onClick={() => setIsEditing((prev) => ({ ...prev, editing: true }))}
                  >
                    <Iconify icon="eva:edit-fill" />
                  </IconButton>
                )}
              </Typography>
            )}
            {isEditing.editing ? (
              <TextField
                fullWidth
                label="Category"
                value={equipmentType.category}
                onChange={(e) => handleChange('category', e.target.value)}
                onBlur={() => setIsEditing((prev) => ({ ...prev, editing: false }))}
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                Category: {equipmentType.category}{' '}
                {isStaff && (
                  <IconButton size="small" onClick={() => setIsEditing((prev) => ({ ...prev, editing: true }))}>
                    <Iconify icon="eva:edit-fill" />
                  </IconButton>
                )}
              </Typography>
            )}
            {isEditing.editing ? (
              <TextField
                fullWidth
                label="Skill Level"
                value={equipmentType.skill_level}
                onChange={(e) => handleChange('skill_level', e.target.value)}
                onBlur={() => setIsEditing((prev) => ({ ...prev, editing: false }))}
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                Skill Level: {equipmentType.skill_level}{' '}
                {isStaff && (
                  <IconButton size="small" onClick={() => setIsEditing((prev) => ({ ...prev, editing: true }))}>
                    <Iconify icon="eva:edit-fill" />
                  </IconButton>
                )}
              </Typography>
            )}
            {isEditing.editing && isStaff &&(
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save Changes
          </LoadingButton>
        )}
          </Card>
        </Box>
        <Box sx={{ flex: '1', p: 2 }}>
          <Card sx={{ p: 2, mb: 2 , backgroundColor: 'transparent', boxShadow: 'none'}}>
            {isEditing.equipment_image ? (
              <TextField
                fullWidth
                label="Image URL"
                value={equipmentType.equipment_image}
                onChange={(e) => handleChange('equipment_image', e.target.value)}
                onBlur={() => setIsEditing((prev) => ({ ...prev, equipment_image: false }))}
              />
            ) : (
              <>
                {isStaff ? (
                  <>
                    <Button onClick={handleImageUrlDialogOpen} sx={{ padding: 0, minWidth: '100%' }}>
                      <img
                        src={equipmentType.equipment_image}
                        alt={equipmentType.name}
                        style={{ width: 350, height: 500, cursor: 'pointer' }}
                      />
                    </Button>
                    <Dialog open={imageUrlDialogOpen} onClose={handleImageUrlDialogClose}>
                      <DialogTitle>Edit Image URL</DialogTitle>
                      <DialogContent>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Image URL"
                          fullWidth
                          value={imageUrl}
                          onChange={handleImageUrlChange}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleImageUrlDialogClose}>Cancel</Button>
                        <Button onClick={handleImageUrlSave} color="primary">
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </>
                ) : (
                  <img
                    src={equipmentType.equipment_image}
                    alt={equipmentType.name}
                    style={{ width: 350, height: 500 }}
                  />
                )}
              </>
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

EquipmentDetailsView.propTypes = {
  isStaff: PropTypes.bool.isRequired,
};
