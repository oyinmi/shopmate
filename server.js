/* jshint  esversion: 6*/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;


 // Configuring express server
const app = express();

  // Importing DB 
const db = require('./db.js');

  // Configuring body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({"message": "Congratulations"});
});

// Import Controllers
const user_controller = require('./controller/user_controller');

app.use('/', router);
app.use('/users', require('./routes/user_route'));

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 7000;

// Setting up the server
app.listen(port, () => {
    console.log(`listening on port${port}`);
});

module.exports = app;
