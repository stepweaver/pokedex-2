import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Main from './Main/Main';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';

const Components = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/main' element={<Main />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile/:userId' element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default Components;