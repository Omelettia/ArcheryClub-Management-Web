import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import {BookingView} from 'src/sections/booking/view'; 

// ----------------------------------------------------------------------

export default function BookingPage({ chosenItems }) {
  return (
    <>
      <Helmet>
        <title> Booking | WolfArchery </title>
      </Helmet>

      <BookingView  chosenItems={chosenItems}  />
    </>
  );
}

BookingPage.propTypes = {

  chosenItems: PropTypes.array.isRequired,
};