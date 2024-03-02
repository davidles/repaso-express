const fs = require('fs');
const path = require('node:path');
const crypto = require('crypto')
const pathFile = path.join( __dirname, '..', 'db', 'user-data.json' );
const userData = require('../db/user-data.json'); // Parsear JSON -> JS

const controller = {
    registerForm: ( req, res ) =>{
        res.render('register')
    },

    create: (req, res) =>{
        const newUser = {
            id: crypto.randomUUID(),
            ...req.body
        };

        // JS
        userData.push(newUser);

        // JSON
        fs.writeFileSync( pathFile, JSON.stringify(userData, null, 2 ) )

        res.redirect('/')
    }
}

module.exports = controller;