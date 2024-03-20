//Multer
const path = require('node:path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file,cb) => cb(null, 'public/images'),
    
    filename: (req, file, cb) =>{
        
        const newName = `img-${Date.now()}${path.extname(file.originalname)}`

        cb(null, newName)
    }
})

const upload = multer({ storage });

module.exports  = upload;