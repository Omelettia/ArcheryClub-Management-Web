import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import {EquipmentDetailsView} from 'src/sections/equipment-details/view'; 

// ----------------------------------------------------------------------

export default function EquipmentDetailsPage({ isStaff }) {
  return (
    <>
      <Helmet>
        <title> Equipment-details | WolfArchery </title>
      </Helmet>

      <EquipmentDetailsView isStaff={isStaff} />
    </>
  );
}

EquipmentDetailsPage.propTypes = {
  isStaff: PropTypes.bool.isRequired, 
};
