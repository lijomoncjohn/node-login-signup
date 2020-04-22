const express = require('express')
const router = express.Router()
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