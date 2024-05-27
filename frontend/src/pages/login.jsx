import { Helmet } from 'react-helmet-async';

import PropTypes from 'prop-types';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage({ isAuthenticated, setIsAuthenticated }) {
  return (
    <>
      <Helmet>
        <title> Login | WolfArchery </title>
      </Helmet>

      <LoginView isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </>
  );
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool, 
  setIsAuthenticated: PropTypes.func, 
};