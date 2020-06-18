/* jshint esversion: 6 */

const mongoose = require('../db');
const schema = new mongoose.Schema(
    {
        name: {
            desc: "The product's name.",
            trim: true,
            type: String,
            required: true,
            max: 200
        },
        price: {
            desc: "The product price.",
            trim: true,
            type: Number,
            required: true
        }
    },    
    {
        strict: true,
        versionKey: false,
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

module.exports = mongoose.model("Product", schema);