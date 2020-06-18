// Product controller: All business logic goes here


/* jshint esversion: 6 */

const Product = require('../models/product_model');
const bcrypt = require('bcrypt');

// To Create A Product  
exports.create = (req, res) => {

    // validation request
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({
            message: "Requred field can not be empty",
        });
    }

    // Create a user
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
    });

    // Save user to database  
    product
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error occured while creating the user.",
            });
        });
};  