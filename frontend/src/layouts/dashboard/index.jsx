import { useState} from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children,isAuthenticated, chosenItems, bookingOrders,isStaff,setIsAuthenticated, setIsStaff,setIsAdmin}) {
  const [openNav, setOpenNav] = useState(false);
  
  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} chosenItems={chosenItems} bookingOrders = {bookingOrders} isAuthenticated = {isAuthenticated} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} isAuthenticated={isAuthenticated} isStaff = {isStaff} setIsAuthenticated={setIsAuthenticated} setIsStaff={setIsStaff} 
          setIsAdmin={setIsAdmin} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func.isRequired,
  setIsStaff: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
  isStaff: PropTypes.bool,
  chosenItems: PropTypes.array,
  bookingOrders: PropTypes.array,
};
