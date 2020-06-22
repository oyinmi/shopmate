/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();

//Users Route
const user = require('./user');
router.use(user);

//Admin Route
const admin = require('./admin');
router.use(admin);

//Product Route
const product = require('./product');
router.use(product);

module.exports = router;
