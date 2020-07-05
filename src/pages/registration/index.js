import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/user';

import RegistrationForm from './components/registration-form';

const Registration = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user.isLoggedIn) {
      history.push('/profile');
    }
  }, [history, user.isLoggedIn]);

  return <RegistrationForm />;
};

export default Registration;