import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { loginUser } from './loginService';
import './LoginForm.css';

const Login = () => {
  const navigate = useNavigate();

  const [ user, setUser ] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      try {
        const loggedInUser = await loginUser(user.email, user.password);
        alert(`Welcome back!`);
        navigate(`/profile/${loggedInUser.id}`); // Navigate to the profile page with the user ID
      } catch (error) {
        console.error('Error while logging in', error);
      }
    }
  };

  return (
    <div className='login'>
      <LoginForm
        user={user}
        isLogin={true}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Login;