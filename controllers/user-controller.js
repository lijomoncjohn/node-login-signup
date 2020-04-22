const HttpError = require('../custom/http-error')

/**
 * 
 * @param {emal, password} req 
 * @param {token} res 
 * @param {error} next 
 */
const login = (req, res, next) => {
    const { email, password } = req.body
    
    // check for empty parameters
    if (!email || !password) return next (
        new HttpError('Required parameters are empty', 404)
    )

    // for successful login instance
    return res.status(200).json({
        success: true,
        message: 'logged in'
    })
}

/**
 * 
 * @param {first_name, last_name, dob, email, password} req 
 * @param {user} res 
 * @param {error} next 
 */
const signup = (req, res, next) => {
    const { first_name, last_name, dob, email, password } = req.body

    // check for empty parameters
    if (!first_name || !last_name || !dob || !email || !password) return next (
        new HttpError('Required parameters are empty', 404)
    )

    // passed all error test
    return res.status(200).json({
        success: true,
        message: 'ready to sign up'
    })
}

exports.login = login
exports.signup = signup