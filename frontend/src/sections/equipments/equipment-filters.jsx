import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export const CATEGORY_OPTIONS = ['Bow', 'Field', 'Axe', 'Accessories'];
export const SKILL_OPTIONS = ['Master', 'Intermediate', 'Beginner'];
export const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];


// ----------------------------------------------------------------------

export default function EquipmentFilters({ openFilter, onOpenFilter, onCloseFilter }) {
  const renderSkill = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Gender</Typography>
      <FormGroup>
        {SKILL_OPTIONS.map((item) => (
          <FormControlLabel key={item} control={<Checkbox />} label={item} />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Category</Typography>
      <RadioGroup>
        {CATEGORY_OPTIONS.map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
        ))}
      </RadioGroup>
    </Stack>
  );


  const renderPrice = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Price</Typography>
      <RadioGroup>
        {PRICE_OPTIONS.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            control={<Radio />}
            label={item.label}
          />
        ))}
      </RadioGroup>
    </Stack>
  );


  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderSkill}

            {renderCategory}

            {renderPrice}

          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

EquipmentFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};
