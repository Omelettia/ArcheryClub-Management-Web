import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import {EventDetailsView} from 'src/sections/event-details'; 

// ----------------------------------------------------------------------

export default function EventDetailsPage({isAuthenticated}) {
  return (
    <>
      <Helmet>
        <title> Event-details | WolfArchery </title>
      </Helmet>

      <EventDetailsView isAuthenticated={isAuthenticated} />
    </>
  );
}

EventDetailsPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, 
};
