import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Register from './Register/Register';

const Components = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default Components;