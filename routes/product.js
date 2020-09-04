/* jshint esversion: 6 */

const express = require("express");
const { check, validationResult } = require("express-validator");
const product = express.Router();

const Product = require("../model/Product");


/**
 * @method - POST
 * @param - /create
 * @description - Add New Products
 */

// Product creation
product.post(
    "/admin/create",
    [
        check("name", "The product's name.")
            .not()
            .isEmpty(),
        check("price", "The product price.")
            .not()
            .isEmpty(),
        check("quantity", "Number of same product available")
            .not()
            .isEmpty(),   
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            name,
            price,
            quantity
        } = req.body;

        try {
            let product = await Product.findOne({
                name
            });
            if (product) {
                return res.status(400).json({
                    msg: "Product already exist."
                });
            }

            product = new Product({
                name,
                price,
                quantity
            });

            await product.save();

            product = await Product.findOne({
                name
            });
            return res.status(200).json({
                "status": "successfull",
                data: product
            });
        } catch (err) {
            console.error(e);
            res.status(500).send("Error in saving");
        } 
    }
);


/**
 * @method - GET
 * @param - /view
 * @description - View Products
 */

// View Product
product.get(
    "/view",
    [
        check("name", "The product's name")
            .not()
            .isEmpty()
    ],

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { name } = req.body;
        
        try {
            let product = await Product.findOne({
                name
            });

            if (!product)
                return res.status(400).json({
                    msg: "Item does not exist."
                });

            const isMatch = await name;
            if (!isMatch)
                return res.status(400).json({
                    msg: "Item is not available."
                });

            product = await Product.findOne({
                name
            });  
            return res.status(200).json({
                "status": "successful",
                data: product
            });

        } catch (err) {
            console.error(e);
            res.status(500).json({
                msg: "Server Error"
            });
        }
    }
);


module.exports = product;
