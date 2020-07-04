const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/user');

module.exports = {
  authenticate: async (email, password) => {
    const user = await User.where({ email: email }).findOne().select('+password');
    if (!user) {
      throw new Error('Email is not registered.');
    }
    const isLoggedIn = await user.isValidPassword(password);
    const { password: hashedPassword, ...userResponse } = user.toObject();
    if (!isLoggedIn) {
      throw new Error('Wrong password');
    }
    return userResponse;
  },
  checkForDuplicateAccount: async (payload) => {
    const user = await User.where({ '$or': [{ email: payload.email }, { mobileNumber: payload.mobileNumber }] }).findOne().select('+password');
    if (user) {
      const isEmailError = user.email === payload.email;
      const isMobileNumberError = user.mobileNumber === payload.mobileNumber;
      let message = isEmailError && isMobileNumberError ?
        'Account exists with Email and Mobile number.' :
        `Account exists with ${isEmailError ? 'Email' : 'Mobile number'}.`;
      throw new Error(message);
    }
  },
  signToken: (data) => {
    return jwt.sign(
      data,
      config.get('JWT.SECRET_KEY'),
      { expiresIn: config.get('JWT.EXPIRY') },
    );
  },
  verifyToken: (token) => {
    return jwt.verify(token, config.get('JWT.SECRET_KEY'));
  },
  getUserFromToken: (token) => {
    if (!token) {
      return null;
    }
    const { user_id } = jwt.verify(token, config.get('JWT.SECRET_KEY'));
    return User.findById(user_id);
  }
};