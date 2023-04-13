const express = require('express');
const pool = require('../db/db');

const app = express();
// app.use(express.json());
const usuarios = express.Router();

usuarios.route('/')
    .get((req, res) => {
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

    })
    .post((req, res) => {
        const { matricula, nome, nota1, nota2 } = req.body;

        if (matricula && nota1 && nota2 && nome) {
            if (!isNaN(nota1) && !isNaN(nota2)) { // valida se as notas informadas são numéricas
                const media = ((parseFloat(nota1) + parseFloat(nota2)) / 2);

                pool.query(`INSERT INTO usuarios (Matricula, NomeCompleto, Nota1, Nota2, Media, Aprovado)
                VALUES ('${matricula}','${nome}',${nota1},${nota2},${media},${aprovado()})`,
                    function (err, result, fields) {
                        if (err) { // se existir erro na query, retorna o erro para front com a mensagem do mysql
                            res.status(500).json({ error: `${err.sqlMessage}` });
                        } else { // se não tiver erro, retorna o status e a mensagem de sucesso.
                            res.status(201).json({ message: `usuário criado!` });
                        }
                    })
            } else {
                res.status(400).json({ error: 'Nota inválida, deve ser numérica.' });
            }
        } else {
            res.status(400).json({ error: 'Campo obrigatório não informado.' });
        }
    })
    .put((req, res) => {
        const { id, matricula, nome, nota1, nota2 } = req.body;
        if (id && matricula && nome && nota1 && nota2) {
            const media = calculaMedia(nota1, nota2);
            if (media !== 0) {
                pool.query(`UPDATE usuarios SET Matricula = '${matricula}', NomeCompleto = '${nome}', Nota1 = ${nota1}, Nota2 = ${nota2}, Media = ${media}, Aprovado = ${aprovado(media)} WHERE id = ${id}`,
                    function (err, result, fields) {
                        if (err) { // se existir erro na query, retorna o erro para front com a mensagem do mysql
                            res.status(500).json({ error: `${err.sqlMessage}` });
                        } else { // se não tiver erro, retorna o status e a mensagem de sucesso.
                            res.status(201).json({ message: `usuário atualizado!` });
                        }
                    })
            } else {
                res.status(400).json({ error: 'Nota inválida, deve ser numérica.' });
            }
        } else {
            res.status(400).json({ error: 'Campo obrigatório não informado.' });
        }
    })

// função para validar se o usuário informado está aprovado
function aprovado(media) {
    if (media >= 8) {
        return true;
    } else {
        return false;
    }
}

// função para calcular a média
function calculaMedia(nota1, nota2, res) {
    if (!isNaN(nota1) && !isNaN(nota2)) {
        return ((parseFloat(nota1) + parseFloat(nota2)) / 2);
    } else {
        return 0;
    }
}

module.exports = usuarios;