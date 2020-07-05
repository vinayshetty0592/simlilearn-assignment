import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TextField from '../text-field';
import Button from '../button';

import './style.scss';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const handleFormChange = (event) => {
    const { name: field, value } = event.target;
    setForm({ ...form, [field]: value });
  };

  const handleFormSubmit = (event) => {
    alert('Try Login');
    event.preventDefault();
  }

  return (
    <div className='box'>
      <h1 className='margin-0 text-center'>Login</h1>
      <form className='form'>
        <TextField
          name='email'
          type='text'
          classes={{ label: 'form-label' }}
          value={form.email}
          placeholder='Enter Email / Mobile Number'
          onChange={handleFormChange}
        />
        <TextField
          name='password'
          type='password'
          classes={{ label: 'form-label' }}
          value={form.password}
          placeholder='Enter Password'
          onChange={handleFormChange}
        />
        <Button className='btn-fw' type='submit' onClick={handleFormSubmit}>Login</Button>
      </form>
      <div className='text-center'>
        <span>Don't have an account? </span>
        <Link to='/register'>Register Now</Link>
      </div>
    </div>
  );
};

export default Login;