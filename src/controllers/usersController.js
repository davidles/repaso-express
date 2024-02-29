

const controller = {
    registerForm: ( req, res ) =>{
        res.render('register')
    },

    create: (req, res) =>{
        console.log(req.body);

        res.send('Pase  por create')
    }
}

module.exports = controller;