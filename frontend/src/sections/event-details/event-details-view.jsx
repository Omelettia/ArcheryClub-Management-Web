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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Iconify from 'src/components/iconify';
import LoadingButton from '@mui/lab/LoadingButton';

export default function EventDetailsView({isAuthenticated}) {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrlDialogOpen, setImageUrlDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isParticipant, setIsParticipant] = useState(false);
  
  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/events/${eventId}`);
        setEventDetails(response.data);
        if (response.data.participants.includes(userId)) {
          setIsParticipant(true);
        }
        console.log('User ID:', userId);
        console.log('Creator ID:', response.data.creator_id);
        console.log('participatable:', response.data.participatable);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId, userId]);

  const handleChange = (field, value) => {
    const newValue = value === "false";
    setEventDetails((prev) => ({ ...prev, [field]: newValue }));
    console.log("participatable",eventDetails.participatable)
    handleSave();
  };
  
  const shouldShowJoinButton1 = userId !== eventDetails?.creator_id;
  const shouldShowJoinButton2 = shouldShowJoinButton1 && eventDetails?.participatable;
  const shouldShowJoinButton3 = shouldShowJoinButton2 && isAuthenticated;
  
  console.log("shouldShowJoinButton1:", shouldShowJoinButton1);
  console.log("shouldShowJoinButton2:", shouldShowJoinButton2);
  console.log("shouldShowJoinButton3:", shouldShowJoinButton3);


  const handleSave = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:3001/api/events/profile/${eventId}`, eventDetails, config);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving event details:', error);
    }
  };

  const handleJoinEvent = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/events/${eventId}/participants`, { userId, eventId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsParticipant(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const handleImageUrlDialogOpen = () => {
    setImageUrlDialogOpen(true);
  };

  const handleImageUrlDialogClose = () => {
    setImageUrlDialogOpen(false);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleImageUrlSave = () => {
    handleImageUrlDialogClose();
  };

  if (!eventDetails) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/events">
          <IconButton aria-label="back" sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
        <Typography variant="h4" sx={{ mr: 'auto' }}>
          Event Details
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Card sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ mb: 2 }}>
              <img
                src={eventDetails.event_image}
                alt={eventDetails.name}
                style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
              />
            </Box>
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="Image URL"
                  value={eventDetails.event_image}
                  onChange={(e) => handleChange('event_image', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Name"
                  value={eventDetails.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={eventDetails.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom>
                  {eventDetails.name}
                  {userId === eventDetails.creator_id && (
                    <IconButton size="small" onClick={() => setIsEditing(true)}>
                      <Iconify icon="eva:edit-fill" />
                    </IconButton>
                  )}
                </Typography>
                <Typography variant="body1" gutterBottom>{eventDetails.description}</Typography>
                <Typography variant="body1" gutterBottom>Date: {new Date(eventDetails.starting_date).toLocaleDateString()}</Typography>
                {shouldShowJoinButton3 && (
                  <Button variant="contained" color="primary" onClick={handleJoinEvent} sx={{ mt: 2 }}>
                    Join Event
                  </Button>
                )}
                {userId === eventDetails.creator_id && (
                  <>
                    <Select
                      value={!eventDetails.participatable}
                      onChange={(e) => handleChange('participatable', e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      sx={{ mt: 2 }}
                    >
                      <MenuItem value="false">Not Participatable</MenuItem>
                      <MenuItem value="true">Participatable</MenuItem>
                    </Select>
                  </>
                )}
              </>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
EventDetailsView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, 
};