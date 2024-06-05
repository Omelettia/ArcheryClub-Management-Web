import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname, useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';


import { NAV } from './config-layout';
import {navConfig,icon} from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav, isAuthenticated,isStaff,setIsAuthenticated,setIsStaff,setIsAdmin }) {
  const pathname = usePathname();
  const [accountInfo, setAccountInfo] = useState(null);
  const router = useRouter();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    // Retrieve user account info from token when authenticated
    if (isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', decodedToken);
        const { username, name, id,profile_image} = decodedToken;
        setAccountInfo({ username, name, id,profile_image});
      }
    } else {
      // Clear account info when not authenticated
      setAccountInfo(null);
    }
  }, [isAuthenticated]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsStaff(false);
    setIsAdmin(false); 
    console.log("i have been called")
    router.push('/');
  };
  

  const renderAccount = isAuthenticated && accountInfo ? (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Link to="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <Avatar src= {accountInfo.profile_image} alt={accountInfo.username} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">{accountInfo.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {accountInfo.username}
          </Typography>
        </Box>
      </Link>
    </Box>
  ) : (
    // Render an empty space when not authenticated
    <Box sx={{ my: 3, mx: 2.5, py: 2, px: 2.5, height: 72 }} />
  );

  const renderMenu = (
    <Stack component="nav" spacing={1} sx={{ px: 4 }}>
      {navConfig
        // Filter out the 'storage' item if isStaff is false
        .filter((item) => (isStaff || item.title !== 'storage') && !(isAuthenticated && item.title === 'login') && !(!isAuthenticated && item.title === 'records') )
        .map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      {/* Conditionally render logout button when isAuthenticated is true */}
      {isAuthenticated && (
        <ListItemButton
          key="logout"
          component="button"
          onClick={handleLogout}
          sx={{
            minHeight: 44,
            borderRadius: 0.75,
            typography: 'body2',
            color: 'text.secondary',
            textTransform: 'capitalize',
            fontWeight: 'fontWeightMedium',
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
            {icon('ic_lock')}
          </Box>
          <Box component="span">Logout</Box>
        </ListItemButton>
      )}
    </Stack>
  );
    
 

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, ml: 4 }}>
        <Logo />
        <Typography
          variant="body2"
          sx={{
            color: 'red', // Set the text color to red
            ml: 2, // Add left margin to align with the icon
          }}
        >
          Wolf Archery
        </Typography>
      </Box>

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func.isRequired,
  isStaff: PropTypes.bool,
  setIsStaff: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
};
