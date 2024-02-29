const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// /users/register
router.get('/register', usersController.registerForm);
router.post('/register', usersController.create)

module.exports = router