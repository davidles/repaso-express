
const { check, validationResult  } = require('express-validator');

const inputsValues = [
    check('username').notEmpty().withMessage('Debes ingresar un nombre de usuario'),
    check('email').notEmpty().withMessage('Debes ingresar tu email'),
    check('password').notEmpty().withMessage('Debes ingresar una contraseña')
];

const validationErrors = ( req, res, next ) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        // No hay errores
        return next()
    }

    res.render('register', {
        old: req.body,
        errors: errors.mapped() 
    })


}


module.exports = { inputsValues, validationErrors }

