import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

export default function NotificationsPopover({ bookingOrders }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newNotifications = bookingOrders.map(id => ({
      id,
      isUnRead: true,
      title: `Your booking ID ${id} has been made`,
      description: '',
      type: 'booking',
      avatar: null,
    }));
    setNotifications(newNotifications);
  }, [bookingOrders]);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        {totalUnRead > 0 ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">Notifications</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  You have {totalUnRead} unread messages
                </Typography>
              </Box>

              <Tooltip title="Mark all as read">
                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                  <Iconify icon="eva:done-all-fill" />
                </IconButton>
              </Tooltip>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
              <List disablePadding>
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </List>
            </Scrollbar>

            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">No Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have no new notifications.
            </Typography>
          </Box>
        )}
      </Popover>
    </>
  );
}

NotificationsPopover.propTypes = {
  bookingOrders: PropTypes.array.isRequired,
};

function NotificationItem({ notification }) {
  return (
    <ListItemButton>
      <ListItemText primary={notification.title} secondary={notification.description} />
    </ListItemButton>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isUnRead: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    avatar: PropTypes.any,
  }).isRequired,
};
