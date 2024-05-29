import { Helmet } from 'react-helmet-async';
import {EventDetailsView} from 'src/sections/event-details'; 

// ----------------------------------------------------------------------

export default function EventDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Event-details | WolfArchery </title>
      </Helmet>

      <EventDetailsView  />
    </>
  );
}
