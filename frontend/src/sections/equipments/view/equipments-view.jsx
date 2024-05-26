import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { equipments } from 'src/_mock/equipments';

import EquipmentCard from '../equipment-card';
import EquipmentSort from '../equipment-sort';
import EquipmentFilters from '../equipment-filters';
import EquipmentCartWidget from '../equipment-cart-widget';

// ----------------------------------------------------------------------

export default function EquipmentsView() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Equipments
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <EquipmentFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <EquipmentSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {equipments.map((equipment) => (
          <Grid key={equipment.id} xs={12} sm={6} md={3}>
            <EquipmentCard equipment={equipment} />
          </Grid>
        ))}
      </Grid>

      <EquipmentCartWidget />
    </Container>
  );
}
