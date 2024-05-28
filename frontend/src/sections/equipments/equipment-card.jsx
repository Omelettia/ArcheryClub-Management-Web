import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

export default function ShopEquipmentCard({ equipment }) {
  const renderImg = (
    <Box
      component="img"
      alt={equipment.name}
      src={equipment.equipment_image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      {equipment.renting_price && fCurrency(equipment.renting_price)}
    </Typography>
  );

  return (
    <Card>
      <RouterLink to={`/equipment-details/${equipment.id}`} style={{ textDecoration: 'none' }}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {renderImg}
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {equipment.name}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {renderPrice}
          </Stack>
        </Stack>
      </RouterLink>
    </Card>
  );
}

ShopEquipmentCard.propTypes = {
  equipment: PropTypes.object,
};
