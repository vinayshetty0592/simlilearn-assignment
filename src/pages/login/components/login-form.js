import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import TextField from '../../../components/text-field';
import Button from '../../../components/button';
import UserContext from '../../../contexts/user';

import './style.scss';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    title: '',
    messages: [],
  });
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const handleFormChange = (event) => {
    const { name: field, value } = event.target;
    setForm({ ...form, [field]: value });
  };

  const handleFormSubmit = async () => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/login`, form, { withCredentials: true });
      const { success, data } = response.data;
      if (success) {
        setUser({
          ...user,
          isLoggedIn: true,
          user: {
            ...data
          }
        });
        history.push('/profile');
      } else {
      }
    } catch (error) {
      const { data, message } = error.response.data;
      setError({
        title: message,
        messages: data.errors || []
      });
    }
  };

  return (
    <div className='box'>
      <h1 className='margin-0 text-center'>Login</h1>
      {
        (error.messages.length > 0 || error.title.length > 0) &&
        <div className='errors'>
          {error.title.length > 0 && <h4 className='margin-0 title'>{error.title}</h4>}
          {
            error.messages.length > 0 &&
            <ul className='margin-0'>
              {error.messages.map((message, index) => <li key={index}>{message}</li>)}
            </ul>
          }
        </div>
      }
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
        <Button className='btn-fw' type='button' onClick={handleFormSubmit}>Login</Button>
      </form>
      <div className='text-center'>
        <span>Don't have an account? </span>
        <Link to='/register'>Register Now</Link>
      </div>
    </div>
  );
};

export default LoginForm;