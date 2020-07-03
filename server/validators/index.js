const { body } = require('express-validator');

module.exports = {
  validationLoginForm: [
    body('email').isEmail().withMessage('Invalid email.'),
    body('password').isLength({ min: 1 }).withMessage('Password should not be empty.')
  ]
}