/* jshint  esversion: 6*/

const express = require('express');
const bodyParser = require('body-parser');
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

// Import router
app.use('/', route);

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8000;

// Setting up the server
app.listen(port, () => {
    console.log(`listening on port${port}`);
});

module.exports = app;
