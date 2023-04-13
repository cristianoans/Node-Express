const express = require('express');
const pool = require('../db/db');

const app = express();
const usuarios = express.Router();

usuarios.route('/')
    .get((req, res) => {
        const { nome, media, aprovado } = req.query;
        if (nome) {
            pool.query(`SELECT * FROM usuarios WHERE NomeCompleto LIKE '%${nome}%'`, function (err, result) {
                if (err) {
                    res.status(500).json({ error: `${err.sqlMessage}` });
                } else {
                    res.status(200).json(result);
                }
            })
        } else if (media) {
            pool.query(`SELECT * FROM usuarios WHERE Media >= ${media}`, function (err, result) {
                if (err) {
                    res.status(500).json({ error: `${err.sqlMessage}` });
                } else {
                    res.status(200).json(result);
                }
            })
        } else if (aprovado) {
            pool.query(`SELECT * FROM usuarios WHERE Aprovado = ${aprovado}`, function (err, result) {
                if (err) {
                    res.status(500).json({ error: `${err.sqlMessage}` });
                } else {
                    res.status(200).json(result);
                }
            })
        } else {
            pool.query("SELECT * FROM `usuarios`", function (err, result) {
                if (err) {
                    res.status(500).json({ error: `${err.sqlMessage}` });
                } else {
                    res.status(200).json(result);
                }
            })
        }
    })
    .post((req, res) => {
        const { matricula, nome, nota1, nota2 } = req.body;
        if (matricula && nota1 && nota2 && nome) { // valida se os campos estão presentes na requisição
            const media = calculaMedia(nota1, nota2); // a função média valida se as notas são numéricas e retorna a media calculada
            if (media !== 0) { // se a média retornada for 0, significa que alguma nota informada é texto
                pool.query(`INSERT INTO usuarios (Matricula, NomeCompleto, Nota1, Nota2, Media, Aprovado)
                VALUES ('${matricula}','${nome}',${nota1},${nota2},${media},${aprovado()})`,
                    function (err) {
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
        if (id && matricula && nome && nota1 && nota2) { // valida se os campos estão presentes na requisição
            pool.query(`SELECT * FROM usuarios WHERE id = ${id}`, function (err, result) { // primeiro eu faço uma consulta para verificar se o id existe no banco
                if (result.length === 0) { // se não eu retorno mensagem de erro
                    res.status(404).json({ error: `id inexistente no banco` });
                    return;
                } else { // mas se existir eu executo o restante da lógica de atualização
                    const media = calculaMedia(nota1, nota2); // a função média valida se as notas são numéricas e retorna a media calculada
                    if (media !== 0) { // se a média retornada for 0, significa que alguma nota informada é texto
                        pool.query(`UPDATE usuarios SET Matricula = '${matricula}', NomeCompleto = '${nome}', Nota1 = ${nota1}, Nota2 = ${nota2}, Media = ${media}, Aprovado = ${aprovado(media)} WHERE id = ${id}`,
                            function (err) {
                                if (err) { // se existir erro na query, retorna o erro para front com a mensagem do mysql
                                    res.status(500).json({ error: `${err.sqlMessage}` });
                                } else { // se não tiver erro, retorna o status e a mensagem de sucesso.
                                    res.status(201).json({ message: `usuário atualizado!` });
                                }
                            })
                    } else {
                        res.status(400).json({ error: 'Nota inválida, deve ser numérica.' });
                    }
                }
            })
        } else {
            res.status(400).json({ error: 'Campo obrigatório não informado.' });
        }
    })
    .delete((req, res) => {
        const { id } = req.body;
        if (id) {
            pool.query(`SELECT * FROM usuarios WHERE id = ${id}`, function (err, result) {
                if (result.length === 0) {
                    res.status(404).json({ error: `id inexistente no banco` });
                    return;
                } else {
                    pool.query(`DELETE FROM usuarios WHERE id = ${id}`, function (err) {
                        if (err) { // se existir erro na query, retorna o erro para front com a mensagem do mysql
                            res.status(500).json({ error: `${err.sqlMessage}` });
                        } else { // se não tiver erro, retorna o status e a mensagem de sucesso.
                            res.status(200).json({ message: `usuário deletado!` });
                        }
                    })
                }
            })


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
function calculaMedia(nota1, nota2) {
    if (!isNaN(nota1) && !isNaN(nota2)) {
        return ((parseFloat(nota1) + parseFloat(nota2)) / 2);
    } else {
        return 0;
    }
}

module.exports = usuarios;