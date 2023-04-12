const express = require('express');
const pool = require('./db/db');
const usuarios = require('./routes/usuarios');

const app = express();

app.use('/usuarios', usuarios);



app.listen(3000, () => {
    console.log(`Server iniciado http://localhost:3000/`)
});






