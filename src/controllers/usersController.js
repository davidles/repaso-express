const fs = require('fs');
const path = require('node:path');
const crypto = require('crypto')
const pathFile = path.join( __dirname, '..', 'db', 'user-data.json' );
const userData = require('../db/user-data.json'); // Parsear JSON -> JS
const { hashSync, compareSync } = require('bcryptjs')

const controller = {
    registerForm: ( req, res ) =>{
        res.render('register')
    },

    create: (req, res) =>{
        // console.log('BODY: ', req.body.password)
        const passHash = hashSync( req.body.password, 10 );
        // console.log('HASH: ' ,passHash)

        const newUser = {
            id: crypto.randomUUID(),
            ...req.body,
            password: passHash,
            img: req.file?.filename || 'default-user.png'
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

        // const { id }  = req.params

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
    },

    loginForm: (req, res) =>{
        res.render('login')
    },

    log:(req, res)  =>{

        const userFound = userData.find((user) => user.email === req.body.email );

        if(userFound !== undefined){
            // Contraseña
            const isValid = compareSync( req.body.password, userFound.password );

            if(isValid  === true){
                return res.redirect('/')
            }else{
                return res.render('login')
            }

        }else{
            return res.send('Usuario no encontrado')
        }
        
    
    }
}

module.exports = controller;