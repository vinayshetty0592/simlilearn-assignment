import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../../contexts/user';
import LoginForm from './components/login-form';

const Login = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user.isLoggedIn) {
      history.push('/profile');
    }
  }, [history, user.isLoggedIn]);
  return <LoginForm />;
};

export default Login;