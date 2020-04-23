const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const HttpError = require('./custom/http-error')
// Import required routes to app
const userRoutes = require('./routes/user')

// Include body-parser middleware to handle requests body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true, parameterLimit: 1000}));

// Include imported routes
app.use('/api/user', userRoutes)

// Throw new error for invalid routes
app.use((req, res, next) => {
    const error = new HttpError('Sorry, could not find that route', 404)
    throw error
})

// Error handling
app.use((error, req, res, next) => {
    // If response already sent
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({success: false, message: error.message || 'An unknown error occured'}) // Return error when thrown from a router
})

// Connect to mongodb using mongoose
mongoose.connect('mongodb://localhost:27017/userdemodb', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Connected to database')) // Functions after succesfully connected to db
        .catch((err) => console.log('Error connecting to database' + err)); // Returns connection error details

// Create node app to server. Running on port 80 by default
var port = 80 || 3000;
app.listen(port, console.log(`App running on ${port} & 443 port(s)`));