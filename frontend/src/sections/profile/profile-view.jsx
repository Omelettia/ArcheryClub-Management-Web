import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(atob(token.split('.')[1])).id;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:3001/api/users/${userId}`, config);
        setProfile(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the authentication token
      const userId = JSON.parse(atob(token.split('.')[1])).id; // Retrieve the user ID from the token
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      };
  
      await axios.put(`http://localhost:3001/api/users/profile/${userId}`, profileData, config);
      setProfile(profileData);
      localStorage.setItem('profile', JSON.stringify(profileData));
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  

  if (!profile) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3, display: 'flex' }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Profile
        </Typography>
        <Card sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
          <Stack direction="column" sx={{ flex: '1 1 auto', justifyContent: 'center', alignItems: 'flex-start', mr: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Name: 
              {editing ? (
                <TextField
                  fullWidth
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  size="small"
                  sx={{ ml: 1 }}
                />
              ) : (
                profile.name
              )}
              <IconButton onClick={handleEditClick} sx={{ ml: 1 }}>
                <Iconify icon="eva:edit-fill" />
              </IconButton>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Phone Number: 
              {editing ? (
                <TextField
                  fullWidth
                  name="phonenumber"
                  value={profileData.phonenumber}
                  onChange={handleChange}
                  size="small"
                  sx={{ ml: 1 }}
                />
              ) : (
                profile.phonenumber
              )}
              <IconButton onClick={handleEditClick} sx={{ ml: 1 }}>
                <Iconify icon="eva:edit-fill" />
              </IconButton>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Address: 
              {editing ? (
                <TextField
                  fullWidth
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  size="small"
                  sx={{ ml: 1 }}
                />
              ) : (
                profile.address
              )}
              <IconButton onClick={handleEditClick} sx={{ ml: 1 }}>
                <Iconify icon="eva:edit-fill" />
              </IconButton>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Points: {profile.points}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Rank: {profile.rank}
            </Typography>
          </Stack>
        </Card>
        {editing && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Save Changes
          </LoadingButton>
        )}
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar
          alt={profile.name}
          src={profile.profile_image}
          sx={{ width: 350, height: 500, borderRadius: '12px'}}
        />
        <Typography variant="h4" sx={{ textAlign: 'center', mt: 1 }}>
            {profile.name}
        </Typography>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
              {profile.admin && ' Admin'}
              {!profile.admin && profile.staff && ' Staff'}
        </Typography>
      </Box>
    </Box>
  );
}
