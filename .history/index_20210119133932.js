/* jshint  esversion: 6*/
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport_setup');
//Add Route files
const route = require("./routes/route"); 


// Configuring express server
const app = express();


// Importing DB 
const db = require('./config/db.js');

// Configuring body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ "message": "Congratulations, Api working" });
});


   // Initialize cookieSession
app.use(cookieSession({
    name: 'shopm8 session',
    keys: ['key1', 'key2']
}));


   // Initialize passport and google auth & Direct sessions to authenticate
app.use(passport.initialize());
app.use(passport.session());


   // Import google authentication
app.get('/success', (req, res) => res.send(`Welcome ${req.user.email}`));
app.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback',passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


// Import router
app.use('/', route);

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8000;

// Setting up the server
app.listen(port, () => {
    console.log(`listening on port${port}`);
});

module.exports = app;
