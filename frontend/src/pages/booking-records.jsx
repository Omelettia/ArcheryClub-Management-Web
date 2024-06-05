import { Helmet } from 'react-helmet-async';

import { BookingRecordsView } from 'src/sections/booking-records/view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export default function BookingRecordsPage({ isStaff }) {
  return (
    <>
      <Helmet>
        <title> BookingRecords | WolfArchery </title>
      </Helmet>

      <BookingRecordsView isStaff = {isStaff} />
    </>
  );
}
BookingRecordsPage.propTypes = {
  isStaff: PropTypes.bool.isRequired, 
};