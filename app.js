const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');

const config = require('./config/config')
const HttpError = require('./custom/http-error')

// Import required routes to app
const userRoutes = require('./routes/user')

const app = express()

// Include body-parser middleware to handle requests body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false, parameterLimit: 1000}));

app.use(session({
    secret: 'thisismyseceretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}))

// To handle CORS erros and requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    next()
})

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Include imported routes
app.use('/api/user', userRoutes)


// // Throw new error for invalid routes
app.use((req, res, next) => {
    const error = new HttpError('Sorry, could not find that route', 404)
    throw error
})

// // Error handling
app.use((error, req, res, next) => {
    // If response already sent
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({success: false, message: error.message || 'An unknown error occured'}) // Return error when thrown from a router
})

// Connect to mongodb using mongoose
mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then(() => console.log('Connected to database')) // Functions after succesfully connected to db
        .catch((err) => console.log('Error connecting to database' + err)); // Returns connection error details

// Create node app to server. Running on port 80 by default
var port = 80 || 3000;
app.listen(port, console.log(`App running on ${port}`));