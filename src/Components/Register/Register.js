import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { createUser } from './registerService';

const Register = () => {
  const navigate = useNavigate();
  
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: ''
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRegistered = await createUser(newUser);
    if (userRegistered) {
      alert(`${userRegistered.get('firstName')} has been registered!`);
      navigate('/login');
    }
  };

  return (
    <div>
      <RegisterForm
        user={newUser}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
};

export default Register;