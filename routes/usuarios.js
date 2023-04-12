const express = require('express');
const pool = require('../db/db');

const app = express();
// app.use(express.json());
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

usuarios.post('/novo', (req, res) => {
    const { nome, nota1, nota2 } = req.body;

    if (nota1 && nota2 && nome) {
        if (!isNaN(nota1) && !isNaN(nota2)) {
            const media = ((parseFloat(nota1) + parseFloat(nota2)) / 2);
    
            pool.query(`INSERT INTO usuarios (NomeCompleto, Nota1, Nota2, Media, Aprovado) VALUES ('${nome}',${nota1},${nota2},${media},${aprovado()})`, function (err, result, fields) {
                res.json(result);
            })
        } else {
            res.json({ error: 'Nota inválida, deve ser numérica.' });
        }
    } else {
        res.json({ error: 'Campo obrigatório não informado.' });
    }
})

function aprovado (media){
    if (media >= 8) {
        return true;
    } else {
        return false;
    }
}


module.exports = usuarios;