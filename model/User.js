/* jshint esversion: 6 */

const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
        name: {
            desc: "The user's name.",
            trim: true,
            type: String,
            required: true,
        },
        username: {
            desc: "The user's username.",
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
            select: "password",
        },
        userType: {
            desc: "user roles",
            trim: true,
            type: String,
            enum: ["User"],
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

module.exports = mongoose.model("user", UserSchema);