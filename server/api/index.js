const { Router } = require('express');
const { validationResult } = require('express-validator');
const { validationLoginForm } = require('../validators')

const api = Router();

api.post('/login', validationLoginForm, (request, response) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response.json({
      succes: false,
      message: 'Login failed',
      data: {
        errors: result.array()
      }
    }, 400);
  }

  return response.json({
    succes: true,
    message: 'Login successful!',
    data: {}
  })
});

api.post('/register', (request, response) => {
  console.log(request.body);
  response.json({
    message: 'Hello World'
  });
});

module.exports = api;