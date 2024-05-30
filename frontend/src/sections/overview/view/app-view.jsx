import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from '../app-widget-summary';
import EventPostCard from '../event-post-card';
import AppNewsUpdate from '../app-news-update';

export default function AppView({ isAuthenticated }) {
  const [name, setName] = useState('');
  const [totals, setTotals] = useState({
    users: 0,
    equipment: 0,
    events: 0,
  });
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTotalsAndData = async () => {
      try {
        const [
          usersRes,
          equipmentRes,
          eventsRes,
          equipmentTypesRes,
          eventsListRes,
        ] = await Promise.all([
          axios.get('http://localhost:3001/api/users/total/count'),
          axios.get('http://localhost:3001/api/equipments/total/count'),
          axios.get('http://localhost:3001/api/events/total/participatable'),
          axios.get('http://localhost:3001/api/equipmentTypes'),
          axios.get('http://localhost:3001/api/events/'),
        ]);

        setTotals({
          users: usersRes.data.totalUsers,
          equipment: equipmentRes.data.totalEquipments,
          events: eventsRes.data.totalEvents,
        });
        setEquipmentTypes(equipmentTypesRes.data);
        setEvents(eventsListRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTotalsAndData();

    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setName(decodedToken.name);
    }
  }, [isAuthenticated]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {isAuthenticated ? `Welcome back, ${name} 👋` : 'We are waiting'}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Users"
            total={totals.users}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_user.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Equipments"
            total={totals.equipment}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_equipment.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Events"
            total={totals.events}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_event.png" />}
          />
        </Grid>

        <Grid item xs={12} md={9} >
          {events.length > 0 ? (
            <EventPostCard events={events.filter(event => event.participatable === true)}   />
          ) : (
            <Typography variant="body1">Loading events...</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={9}>
          <AppNewsUpdate
            title="News Equipment"
            list={equipmentTypes.slice(0, 5).map((equipment, index) => ({
              id: equipment.id,
              title: equipment.name,
              description: equipment.description,
              image: equipment.equipment_image || `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: new Date(), // Placeholder date
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

AppView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
