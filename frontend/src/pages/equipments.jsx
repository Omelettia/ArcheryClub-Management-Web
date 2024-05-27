import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import {EquipmentsView} from 'src/sections/equipments/view'; 

// ----------------------------------------------------------------------

export default function EquipmentsPage({ isStaff }) {
  return (
    <>
      <Helmet>
        <title> Equipments | WolfArchery </title>
      </Helmet>

      <EquipmentsView isStaff={isStaff} />
    </>
  );
}

EquipmentsPage.propTypes = {
  isStaff: PropTypes.bool.isRequired, 
};
