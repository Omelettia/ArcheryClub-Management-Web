import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { EventView } from 'src/sections/event/view';

// ----------------------------------------------------------------------

export default function EventPage({isAuthenticated}) {
  return (
    <>
      <Helmet>
        <title> Event | WolfArchery </title>
      </Helmet>

      <EventView isAuthenticated = {isAuthenticated}/>
    </>
  );
}
EventPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, 
};