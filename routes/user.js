const express = require('express')
const router = express.Router()
const { check } = require('express-validator') // third party middleware for input validation


// Import controller for user routes
const userController = require('../controllers/user-controller')

// login page
router.get('/login', userController.auth)


// home page
router.get('/home', userController.home)


// sign up page
router.get('/signup', userController.register)

// logout rote clears session
router.get('/logout', userController.logout)

// log in route
router.post('/login', [
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 6 })
  ], userController.login)


// sign up route
router.post('/signup', [
    // first name cannot be empty
    check('firstName').not().isEmpty(),
    // last name cannot be empty
    check('lastName').not().isEmpty(),
    // date of birth cannot be empty
    check('dob').not().isEmpty(),
    // email must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 6 })
  ], userController.signup)


// Exports module to app
module.exports = router