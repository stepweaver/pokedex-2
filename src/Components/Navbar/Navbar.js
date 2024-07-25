import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Parse from 'parse';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from './assets/ball_1408998.png';
import './Navbar.css';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const currentUser = Parse.User.current();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static' color='transparent'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={handleMenu}>
          <img src={MenuIcon} alt='menu' width='24' height='24' />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          The Pokémon App
        </Typography>
        <Button color='inherit' component={Link} to='/main'>Pokemon</Button>
        <Button color='inherit' component={Link} to='/trainers'>Trainers</Button>
        <Button color='inherit' component={Link} to={`/profile/${currentUser.id}`}>Profile</Button>
        <Button color='inherit' component={Link} to='/about'>About</Button>
        <Button color='inherit' component={Link} to='#'>Logout</Button>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to='/main'>Pokemon</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to='/trainers'>Trainers</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to={`/profile/${currentUser.id}`}>Profile</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to='/about'>About</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to='#'>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;