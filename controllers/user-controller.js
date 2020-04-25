const jwt = require('jsonwebtoken')
const HttpError = require('../custom/http-error')
const User = require('../models/user')
const { validationResult } = require('express-validator');
const config = require('../config/config')

/**
 * 
 * @param {session.user} req 
 * @param {redirect /api/user/index} res 
 * @param {} next 
 */
const auth = (req, res, next) => 
{
    let user = req.session.user
    if (user)
    {
        res.redirect('/api/user/home')
        return
    }
    res.render('index', { error: false })
}

/**
 * 
 * @param {session.user} req 
 * @param {redirect /api/user/sgnup} res 
 * @param {} next 
 */
const register = (req, res, next) => 
{
    let user = req.session.user
    if (user)
    {
        res.redirect('/api/user/home')
        return
    }
    res.render('signup', { error: false })
}

/**
 * 
 * @param {session.user} req 
 * @param {redirect /api/user/home} res 
 * @param {} next 
 */
const home = (req, res, next) => 
{
    let user = req.session.user
    if (user)
    {
        res.render('users', { app: req.session.app, username: user.firstName })
        return
    }

    res.redirect('/api/user/login')
}

const logout = (req, res, next) =>
{
    if (req.session.user)
    {
        req.session.destroy( () =>
        {
            res.redirect('/api/user/login')
            return
        })
    }
}


/**
 * Login user by checking password and if exists in db
 * @param {email, password} req 
 * @param {token} res 
 * @param {error} next 
 */
const login = async (req, res, next) => 
{
    const { email, password } = req.body
    
    // validate the req body errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
        res.status(404)
        res.render('index', {error: true, message: 'Invalid parameters. Please try later'})
        return
    }

    let existingUser
    try 
    { 
        existingUser = await User.findOne({ email: email })
    }
    catch (err) 
    {
        res.status(404)
        res.render('index', {error: true, message: 'Signup operation failed. Please try later'})
        return
    }

    if (!existingUser) 
    {
        console.log("err");
        
        res.status(404)
        res.render('index', {error: true, message: 'Invalid credentials. Unable to login'})
        return
    }

    existingUser.comparePassword(password, (err, isMatch) => 
    {
        if (err) 
        {
            res.status(404)            
            res.render('index', {error: true, message: 'Invalid credentials. Unable to login'})
            return
        }
        
        if (isMatch && !err) 
        {
            // const token = jwt.sign(
            //     { userId: existingUser._id, email: existingUser.email },
            //     config.secret,
            //     {expiresIn: '1h'} 
            // )

            req.session.user = existingUser
            req.session.app = 1

            // redirect to home
            res.redirect('/api/user/home')
            return
        }
        else
        {
            res.status(404)
            res.render('index', {error: true, message: 'Invalid credentials. Unable to login'})
            return
        }
    })
}


/**
 * Register user by hashing password if not exists in db
 * @param {firstName, lastName, dob, email, password} req 
 * @param {user} res 
 * @param {error} next 
 */
const signup = async (req, res, next) => 
{
    const { firstName, lastName, dob, email, password } = req.body

    // validate the req body errors if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(404)
        res.render('signup', {error: true, message: 'Please check the input parameters and try again'})
        return
    }

    let existingUser
    try 
    { 
        existingUser = await User.findOne({ email: email })
    }
    catch (err)
    {
        res.status(404)
        res.render('signup', {error: true, message: 'Signup operation failed. Please try later'})
        return
    }

    if (existingUser)
    {
        res.status(404)
        res.render('signup', {error: true, message: 'User already exists'})
        return 
    }

    const createdUser = new User({
        firstName,
        lastName,
        email,
        dob,
        password
    })

    try 
    {
        await createdUser.save()
    } 
    catch (err)
    {
        res.status(404)
        res.render('signup', {error: true, message: 'Sigining up failed. Try gain later'}) 
        return
    }
    
    // Passed all error test
    // return res
    //         .status(200)
    //         .json({
    //             success: true,
    //             message: 'User signed up',
    //             user: createdUser
    //         })
    return res.render('index', {error: false, message: 'Succesfully registered. Login now.'}) 
}

// Export all functions here
exports.auth = auth
exports.login = login
exports.signup = signup
exports.home = home
exports.register = register
exports.logout = logout
