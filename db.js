/* jshint esversion: 6 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopmate', { useNewUrlParser: true, useUnifiedTopology: true },
(err) => {
    if (!err) {
        console.log('Successfully Established Connection');
    }
    else {
        console.log('Connection Failed! '+ err);
    }  
});

module.exports = mongoose;
