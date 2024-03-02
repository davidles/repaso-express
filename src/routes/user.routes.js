const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/usersController');
const { inputsValues, validationErrors } = require('../middlewares/validate-register')

// /users/register
router.get('/register', usersController.registerForm);
router.post('/register',inputsValues, validationErrors, usersController.create)

// Agregar metodos Put y Delete

module.exports = router