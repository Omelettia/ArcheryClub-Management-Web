import PropTypes from 'prop-types';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { Link } from 'react-router-dom';

export default function CartWidget({ itemCount }) { // Receive itemCount prop
  return (
    <IconButton
      component={Link}
      to="/booking"
      sx={{
        width: 40,
        height: 40,
      }}
    >
      <Badge showZero badgeContent={itemCount} color="error" max={99}> {/* Use itemCount */}
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </IconButton>
  );
}

CartWidget.propTypes = {
  itemCount: PropTypes.number.isRequired, // Define prop type for itemCount
};
