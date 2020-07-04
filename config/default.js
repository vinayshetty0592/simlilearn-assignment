module.exports = {
  PORT: 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  PASSWORD_SALT_LENGTH: process.env.PASSWORD_SALT_LENGTH || 10
};