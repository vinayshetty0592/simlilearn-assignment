const config = require('config');

const { getUserFromToken } = require('../services/auth');

module.exports = {
  auth: async (request, response, next) => {
    try {
      const token = request.headers[config.get('AUTH_HEADER_NAME')] || request.cookies[config.get('AUTH_COOKIE_NAME')];
      if (!token) {
        throw new Error('Please login.');
      }
      request.user = await getUserFromToken(token);
      if (!request.user) {
        throw new Error('Invalid Token. Please login.');
      }
    } catch (error) {
      return response.json({
        success: false,
        message: error.message || 'Unauthorized',
        data: {}
      }, 401);
    }
    next();
  }
};