const { body } = require('express-validator');

module.exports = {
  validationLoginForm: [
    body('email').exists().isEmail().withMessage('Invalid email.'),
    body('password').isLength({ min: 1 }).withMessage('Password should not be empty.')
  ],
  validationRegistrationForm: [
    body('name').exists().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Invalid email.'),
    body('mobileNumber').exists().isMobilePhone().withMessage('Invalid Mobile Number.'),
    body('password').exists().isLength({ min: 1 }).withMessage('Password is required.')
  ]
}