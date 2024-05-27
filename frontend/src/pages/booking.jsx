import { Helmet } from 'react-helmet-async';

import { BookingView } from 'src/sections/booking/view';

// ----------------------------------------------------------------------

export default function BookingPage() {
  return (
    <>
      <Helmet>
        <title> Booking | WolfArchery </title>
      </Helmet>

      <BookingView />
    </>
  );
}
