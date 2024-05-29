import { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';
import NewEventForm from '../new-event-form'; 

export default function EventView() {
  const [events, setEvents] = useState([]);
  const [isNewEventFormOpen, setNewEventFormOpen] = useState(false); // State variable to control the visibility of the New Event Form

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenNewEventForm = () => {
    setNewEventFormOpen(true);
  };

  const handleCloseNewEventForm = () => {
    setNewEventFormOpen(false);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Event</Typography> 
        {/* Open New Event Form when button is clicked */}
        <Button 
          variant="contained" 
          color="inherit" 
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenNewEventForm} // Call handleOpenNewEventForm when button is clicked
        >
          New Event 
        </Button>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={events} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {events.map((event, index) => (
          <PostCard key={event.id} event={event} index={index} />
        ))}
      </Grid>
      <NewEventForm 
        open={isNewEventFormOpen} 
        onClose={handleCloseNewEventForm} 
        onSubmit={() => {
          // Refetch events when a new event is submitted
          fetchEvents();
          handleCloseNewEventForm();
        }} 
      />
    </Container>
  );
}
