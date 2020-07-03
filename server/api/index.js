const { Router } = require('express');

const api = Router();

api.post('/login', (request, response) => {
  console.log(request.body);
  response.json({
    message: 'Hello World'
  });
});

module.exports = api;