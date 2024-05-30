import { Helmet } from 'react-helmet-async';

import PropTypes from 'prop-types';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage({isAuthenticated}) {
  return (
    <>
      <Helmet>
        <title> Dashboard | WolfArchery </title>
      </Helmet>

      <AppView isAuthenticated={isAuthenticated} />
    </>
  );
}

AppPage.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
};