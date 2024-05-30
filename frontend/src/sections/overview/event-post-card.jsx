import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function EventPostCard({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === events.length - 1 ? 0 : prevIndex + 1));
  };

  const currentEvent = events[currentIndex];

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        onClick={handlePrev}
        sx={{ position: 'absolute', top: '50%', left: 0, zIndex: 1, fontSize: 32 }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <Card>
        <Box sx={{ position: 'relative', pt: 'calc(100% * 3 / 4)' }}>
          <Box
            component="img"
            alt={currentEvent.name}
            src={currentEvent.event_image}
            sx={{
              top: 0,
              width: 1,
              height: 1,
              objectFit: 'cover',
              position: 'absolute',
            }}
          />
        </Box>

        <Box sx={{ p: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 44, overflow: 'hidden', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          <Typography color="inherit" variant="subtitle2" fontSize="1.2rem">
            {currentEvent.name}
          </Typography>
        </Box>
      </Card>

      <IconButton
        onClick={handleNext}
        sx={{ position: 'absolute', top: '50%', right: 0, zIndex: 1, fontSize: 32 }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

EventPostCard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    event_image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default EventPostCard;
