module.exports = {
  PORT: 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  PASSWORD_SALT_LENGTH: process.env.PASSWORD_SALT_LENGTH || 10,
  JWT: {
    EXPIRY: '2 days',
    SECRET_KEY: process.env.JWT_SECRET_KEY || 'simplilearn'
  },
  AUTH_COOKIE_NAME: 'x_access_token',
  AUTH_HEADER_NAME: 'x-access-token',
};