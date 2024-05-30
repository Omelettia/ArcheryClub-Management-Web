import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import {EquipmentDetailsView} from 'src/sections/equipment-details/view'; 

// ----------------------------------------------------------------------

export default function EquipmentDetailsPage({ isStaff,setChosenItems,isAuthenticated }) {
  return (
    <>
      <Helmet>
        <title> Equipment-details | WolfArchery </title>
      </Helmet>

      <EquipmentDetailsView isStaff={isStaff} setChosenItems={setChosenItems} isAuthenticated ={isAuthenticated}  />
    </>
  );
}

EquipmentDetailsPage.propTypes = {
  isStaff: PropTypes.bool.isRequired, 
  isAuthenticated: PropTypes.bool.isRequired, 
  setChosenItems: PropTypes.func.isRequired,
};
