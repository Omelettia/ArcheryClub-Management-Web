import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom instead of RouterLink

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';


export default function PostCard({ event }) {
  const { id, event_image, name, starting_date, participants } = event;

  return (
    <Grid xs={12} sm={6} md={3}>
      <Link to={`/event-details/${id}`} style={{ textDecoration: 'none' }}> {/* Use Link instead of RouterLink */}
        <Card>
          <Box sx={{ position: 'relative', pt: 'calc(100% * 3 / 4)' }}>
            <Box
              component="img"
              alt={name}
              src={event_image}
              sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
              }}
            />
          </Box>

          <Box sx={{ p: (theme) => theme.spacing(4, 3, 3, 3) }}>
            <Typography variant="caption" component="div" sx={{ mb: 2, color: 'text.disabled' }}>
              {fDate(starting_date)}
            </Typography>

            <Typography
              color="inherit"
              variant="subtitle2"
              underline="hover"
              sx={{
                height: 44,
                overflow: 'hidden',
                WebkitLineClamp: 2,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {name}
            </Typography>

            <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 3, color: 'text.disabled' }}>
              <Stack direction="row">
                <Iconify width={16} icon="eva:people-fill" sx={{ mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(participants)}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </Link>
    </Grid>
  );
}

PostCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    event_image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    starting_date: PropTypes.string.isRequired,
    participants: PropTypes.number.isRequired,
  }).isRequired,
};
