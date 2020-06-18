/* jshint esversion: 6 */

const mongoose = require('../db');
const schema = new mongoose.Schema(   
    {
        name: {
            desc: "The user's name.",
            trim: true,
            type: String,
            required: true,
        },
        email: {
            desc: "The user's email address.",
            trim: true,
            type: String,
            index: true,
            unique: true,
            required: true,
        },
        password: {
            desc: "user password",
            trim: true,
            type: String,
            required: true,
            select: false,
        },
        userType: {
            desc: "user roles",
            trim: true,
            type: String,
            enum: ["Admin", "User"],
            default: "User",
            required: true,
        }
    },
    {
        strict: true,
        versionKey: false,
        timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    }
);

module.exports = mongoose.model("User", schema);