import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Main from './Main/Main';
import Navbar from './Navbar/Navbar';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import About from './About/About';

const Components = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/main' element={<Main />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile/:userId' element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Components;
