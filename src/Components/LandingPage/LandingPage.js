import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <h1>Welcome to Pokémon App</h1>
      <div className='buttons'>
        <Link to='/login'>
          <button>Login</button>
        </Link>
        {' '} or {' '}
        <Link to='/register'>
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;