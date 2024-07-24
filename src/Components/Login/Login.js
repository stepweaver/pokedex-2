import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      alert(`Welcome back!`);
      navigate('/profile'); // TODO: Create Profile module
    }
  }

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