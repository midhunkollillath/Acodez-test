import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';

function CustomAppBar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ marginRight: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Typography
        </Typography>
        <StarIcon sx={{ marginRight: 2 }} />
        <Avatar alt="User" src="/static/images/avatar/1.jpg" />
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
