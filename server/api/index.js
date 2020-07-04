const { Router } = require('express');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const { validationLoginForm, validationRegistrationForm } = require('../validators');
const { authenticate, checkForDuplicateAccount } = require('../services/auth');

const api = Router();

api.post('/login', validationLoginForm, async (request, response) => {
  const result = validationResult(request);
  const { email, password } = request.body;
  if (!result.isEmpty()) {
    return response.json({
      succes: false,
      message: 'Login failed',
      data: {
        errors: result.array()
      }
    }, 400);
  }

  try {
    const data = await authenticate(email, password);
    return response.json({
      succes: true,
      message: 'Login successful!',
      data
    });
  } catch (error) {
    return response.json({
      succes: false,
      message: error.message,
      data: {}
    }, 401);
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
      response.json({
        success: true,
        data: {
          user: userResponse
        }
      }, 201);
    } catch (error) {
      throw error.message.split();
    }
  } catch (error) {
    response.json({
      success: false,
      message: 'Registration failed!',
      error: (Array.isArray(error) && error) || [error.message]
    }, 400);
  }
});

module.exports = api;