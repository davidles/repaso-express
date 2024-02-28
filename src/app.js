const express = require('express');
const app = express();
const path = require('node:path')

// Configuracion de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views') );


// Routes
const mainRoutes = require('./routes/main.routes');

app.use('/', mainRoutes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server up on port http://localhost:${PORT}`))