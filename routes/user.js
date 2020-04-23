const express = require('express')
const router = express.Router()
const { check } = require('express-validator') // third party middleware for input validation


// Import controller for user routes
const userController = require('../controllers/user-controller')
/**
 * User login route
 */
router.post('/login', [
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 6 })
  ], userController.login)

/**
 * User signup route
 */
router.post('/signup', [
    // first name cannot be empty
    check('first_name').not().isEmpty(),
    // last name cannot be empty
    check('last_name').not().isEmpty(),
    // date of birth cannot be empty
    check('dob').not().isEmpty(),
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 6 })
  ], userController.signup)

// Exports module to app
module.exports = router