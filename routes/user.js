const express = require('express')
const router = express.Router()

/**
 * user login route
 * @param email
 * @param password
 */
router.post('/login', (req, res) => {
    res.json({message:"login post request"})
})

module.exports = router