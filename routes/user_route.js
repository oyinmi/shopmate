/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.get('/', userController.findAll);
router.post('/', userController.create);
router.get('/:id', userController.findOne);
router.put('/:id', userController.UpdateUser);
router.delete('/:id', userController.delete);

module.exports = router;