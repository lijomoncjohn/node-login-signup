const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// import required routes to app
const userRoutes = require('./routes/user')

// include body-parser middleware to handle requests body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 1000}));

// includ imported routes
app.use('/api/user', userRoutes)

// error handling
app.use((error, req, res, next) => {
    // if response already sent
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({success: false, message: error.message || 'An unknown error occured'}) // return error when thrown from a router
})

// server running on port 80 by default
var port = 80 || 3000;
app.listen(port, console.log(`App running on ${port} & 443 port(s)`));