/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const productController = require('../controller/product_controller');

router.get('/test', productController.test);

module.exports = router;