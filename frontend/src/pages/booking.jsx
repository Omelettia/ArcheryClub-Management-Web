import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import {BookingView} from 'src/sections/booking/view'; 

// ----------------------------------------------------------------------

export default function BookingPage({ chosenItems,setBookingOrders,setChosenItems }) {
  return (
    <>
      <Helmet>
        <title> Booking | WolfArchery </title>
      </Helmet>

      <BookingView  chosenItems={chosenItems} setBookingOrders = {setBookingOrders} setChosenItems={setChosenItems} />
    </>
  );
}

BookingPage.propTypes = {

  chosenItems: PropTypes.array.isRequired,
  setBookingOrders: PropTypes.func.isRequired,
  setChosenItems: PropTypes.func.isRequired
};