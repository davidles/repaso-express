const path = require('node:path');
const fs = require('node:fs');
const pathToUsers = path.join(__dirname, '..','db','user-data.json') // Retorna la ruta absoluta

const controller = {
    index: ( req, res ) =>{
        const dataUsers =  JSON.parse(fs.readFileSync(pathToUsers, 'utf-8')) // JSON a JS

        
        res.render('index', { data: dataUsers })
    }
}

module.exports = controller;