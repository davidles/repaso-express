const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/usersController');
const { inputsValues, validationErrors } = require('../middlewares/validate-register');

const upload =  require('../middlewares/user-avatar');
const controller = require('../controllers/usersController');

// /users/register
router.get('/register', usersController.registerForm);
router.post('/register', upload.single('avatar') , inputsValues, validationErrors, usersController.create);

// Ver Perfil
router.get('/profile/:id', usersController.profile)

// Agregar metodos Put y Delete
router.get('/edit/:id', usersController.editForm)
router.put('/edit/:id', usersController.updateUser);

router.delete('/delete/:id', usersController.deleteUser);

router.get('/login', controller.loginForm);
router.post('/login', controller.log)


module.exports = router