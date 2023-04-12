const express = require('express');
const pool = require('../db/db');

const app = express();
app.use(express.json());
const usuarios = express.Router();


usuarios.get('/', (req, res) => {
    const { nome, media, aprovado } = req.query;

    if (nome) {
        pool.query(`SELECT * FROM usuarios WHERE NomeCompleto LIKE '%${nome}%'`, function (err, result, fields) {
            res.json(result);
        })
    } else if (media) {
        pool.query(`SELECT * FROM usuarios WHERE Media >= ${media}`, function (err, result, fields) {
            res.json(result);
        })
    } else if (aprovado) {
        pool.query(`SELECT * FROM usuarios WHERE Aprovado = ${aprovado}`, function (err, result, fields) {
            res.json(result);
        })
    } else {
        pool.query("SELECT * FROM `usuarios`", function (err, result, fields) {
            res.json(result);
        })
    }

});


module.exports = usuarios;