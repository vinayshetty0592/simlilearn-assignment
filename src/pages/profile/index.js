import React, { useContext } from 'react';
import UserContext from '../../contexts/user';

const Profile = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return <h1>Profile</h1>;
};

export default Profile;