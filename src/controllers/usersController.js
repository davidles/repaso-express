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
        fs.writeFileSync( pathFile, JSON.stringify(userData, null, 2 ) ) // JS a JSON

        res.redirect('/')
    },

    profile: (req, res) =>{
        const idFound = req.params.id;

        const userFound = userData.find( ( user ) => user.id === idFound );

        res.render('profile', { user: userFound })
    },

    editForm: (req, res) =>{
        const idFound = req.params.id;

        const userFound = userData.find( ( user ) => user.id === idFound );

        res.render('user-edit', { old: userFound })
    },

    updateUser: (req, res) =>{
        const idFound = req.params.id;
        
        const indexFound = userData.findIndex( ( user ) => user.id === idFound );
        
        console.log('RESULTADO: ', req.body);
        
        userData[indexFound] = {
            id: userData[indexFound].id,
            ...req.body,
            // username: req.body.username,
            // email: req.body.email,
            password: userData[indexFound].password
        }

        fs.writeFileSync( pathFile, JSON.stringify(userData, null, 2 ) ); // JS a JSON

        res.redirect('/');

    },

    deleteUser: (req, res)=>{
        const idFound = req.params.id;
        
        const newUsers = userData.filter( ( user ) => user.id !== idFound );

        fs.writeFileSync(pathFile, JSON.stringify(newUsers, null, 2))

        res.redirect('/')
    }
}

module.exports = controller;