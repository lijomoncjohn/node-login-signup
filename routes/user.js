const express = require('express')
const router = express.Router()

// import controller for user routes
const userController = require('../controllers/user-controller')
/**
 * user login route
 */
router.post('/login', userController.login)

/**
 * user signup route
 */
router.post('/signup', userController.signup)

// exports module to app
module.exports = router