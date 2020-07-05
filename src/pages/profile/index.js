import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '../../components/button';

import UserContext from '../../contexts/user';

import './style.scss';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const { name, email, mobileNumber } = user.data;

  const history = useHistory();

  useEffect(() => {
    if (!user.isLoggedIn) {
      history.push('/login');
    }
  }, [history, user.isLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/logout`, {}, { withCredentials: true });

      if (response.data.success) {
        setUser({
          isLoggedIn: false,
          data: {}
        });
        history.push('/login');
      } else {
        alert('Failed to logout. Try again.');
      }
    } catch (error) {
      alert('Failed to logout. Try again.');
    }
  };

  return (
    <div className='box'>
      <h4 className='margin-0 text-center'>Hi {name || ''},</h4>
      <ul className='profile-list'>
        <li><strong>Email: </strong> {email}</li>
        <li><strong>Mobile Number: </strong> {mobileNumber}</li>
      </ul>
      <Button className='btn-fw' onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Profile;