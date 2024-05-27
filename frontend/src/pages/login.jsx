import { Helmet } from 'react-helmet-async';

import PropTypes from 'prop-types';

import { LoginView } from 'src/sections/login/view';

// ----------------------------------------------------------------------

export default function LoginPage({ setIsAuthenticated, setIsStaff, setIsAdmin }) {
  return (
    <>
      <Helmet>
        <title> Login | WolfArchery </title>
      </Helmet>

      <LoginView 
          setIsAuthenticated={setIsAuthenticated} 
          setIsStaff={setIsStaff} 
          setIsAdmin={setIsAdmin}
        />
    </>
  );
}

LoginPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setIsStaff: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
};