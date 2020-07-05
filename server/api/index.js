const { Router } = require('express');
const { validationResult } = require('express-validator');
const config = require('config');

const User = require('../models/user');
const { validationLoginForm, validationRegistrationForm } = require('../validators');
const { authenticate, checkForDuplicateAccount, signToken } = require('../services/auth');
const { auth } = require('../middlewares');

const api = Router();

api.post('/login', validationLoginForm, async (request, response) => {
  const result = validationResult(request).formatWith(({ msg }) => msg);
  const { email, password } = request.body;
  try {
    if (!result.isEmpty()) {
      throw result.array();
    }

    try {
      const data = await authenticate(email, password);
      const token = signToken({
        user_id: data._id
      });
      response.cookie(config.get('AUTH_COOKIE_NAME'), token, { maxAge: 48 * 60 * 60 * 1000 });
      return response.json({
        success: true,
        message: 'Login successful!',
        data: { ...data, token }
      });
    } catch (error) {
      throw error.message.split();
    }
  } catch (error) {
    response.json({
      success: false,
      message: 'Login failed!',
      data: {
        errors: (Array.isArray(error) && error) || [error.message]
      }
    }, 400);
  }
});

api.post('/register', validationRegistrationForm, async (request, response) => {
  try {
    const result = validationResult(request).formatWith(({ msg }) => msg);
    if (!result.isEmpty()) {
      throw result.array();
    }
    try {
      await checkForDuplicateAccount(request.body);
      const user = new User({ ...request.body });
      await user.save();
      const { password, ...userResponse } = user.toObject();
      const token = signToken({
        user_id: userResponse._id
      });
      response.cookie(config.get('AUTH_COOKIE_NAME'), token, { maxAge: 48 * 60 * 60 * 1000 });
      response.json({
        success: true,
        data: {
          ...userResponse,
          token
        }
      }, 201);
    } catch (error) {
      throw error.message.split();
    }
  } catch (error) {
    response.json({
      success: false,
      message: 'Registration failed!',
      data: {
        errors: (Array.isArray(error) && error) || [error.message]
      }
    }, 400);
  }
});

api.post('/logout', auth, async (request, response) => {
  response.clearCookie(config.get('AUTH_COOKIE_NAME'));
  return response.json({
    success: true,
    message: 'You have been logged out.',
    data: {}
  });
});

api.get('/me', auth, async (request, response) => {
  return response.json({
    success: true,
    data: request.user
  });
});

module.exports = api;