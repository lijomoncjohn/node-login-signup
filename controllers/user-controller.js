const jwt = require('jsonwebtoken')
const HttpError = require('../custom/http-error')
const User = require('../models/user')
const { validationResult } = require('express-validator');
const config = require('../config/config')

/**
 * Login user by checking password and if exists in db
 * @param {email, password} req 
 * @param {token} res 
 * @param {error} next 
 */
const login = async (req, res, next) => {
    const { email, password } = req.body
    
    // validate the req body errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next (
        new HttpError('Please check the input parameters and try again', 404) // Return error for empty parameters
    )

    let existingUser
    try { 
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Signup operation failed. Please try later', 500)
        return next(error)
    }

    if (!existingUser) {
        const error = new HttpError('Invalid credentials. Unable to login.', 401)
        return next(error) 
    }

    existingUser.comparePassword(password, (err, isMatch) => {
        if (err) {
            const error = new HttpError('Invalid credentials. Unable to login.', 401)
            return next(error) 
        }
        
        if (isMatch && !err) {
            const token = jwt.sign(
                { userId: existingUser._id, email: existingUser.email },
                config.secret,
                {expiresIn: '1h'} 
            )

            // for successful login instance
            return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                user: {
                    id: existingUser._id,
                    first_name: existingUser.first_name,
                    last_name: existingUser.last_name,
                    email: existingUser.email,
                    dob: existingUser.dob,
                    auth: {
                        token: token
                    },
                }
            })
        }
    })
}

/**
 * Register user by hashing password if not exists in db
 * @param {first_name, last_name, dob, email, password} req 
 * @param {user} res 
 * @param {error} next 
 */
const signup = async (req, res, next) => {
    const { first_name, last_name, dob, email, password } = req.body

    // validate the req body errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next (
        new HttpError('Please check the input parameters and try again', 404) // Return error for empty parameters
    )

    let existingUser
    try { 
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Signup operation failed. Please try later', 500)
        return next(error)
    }

    if (existingUser) {
        const error = new HttpError('User already exists', 500)
        return next(error) 
    }

    const createdUser = new User({
        first_name,
        last_name,
        email,
        dob,
        password
    })

    try {
        await createdUser.save()
    } catch (err) {
        const error = new HttpError(`Sigining up failed. Try gain later ${err}`, 500)
        return next(error)
    }
    
    // Passed all error test
    return res.status(200).json({
        success: true,
        message: 'User signed up',
        user: createdUser
    })
}

// Export all functions here
exports.login = login
exports.signup = signup