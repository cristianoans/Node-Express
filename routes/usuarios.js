
const express = require('express');
const { Op } = require('sequelize');
const User = require('../model/User');

const usuarios = express.Router();

usuarios.route('/')
    .get(async (req, res) => {
        const { matricula, nome, media, aprovado } = req.query;

        let where = {};
        if (nome) {
            where.nomecompleto = { [Op.like]: `%${nome}%` };
        }
        if (media) {
            where.media = { [Op.gte]: media };
        }
        if (aprovado) {
            where.aprovado = (aprovado === "true" ? true : false); // Foi necessário fazer um ternário pois no req vem string
        }
        if (matricula) {
            where.matricula = matricula;
        }

        try {
            const users = await User.findAll({ where });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: `${error}` });
        }
    })
    .post(async (req, res) => {
        const { matricula, nome, nota1, nota2 } = req.body;
        if (matricula && nota1 && nota2 && nome) {
            const media = calculaMedia(nota1, nota2);
            const aprovado = estadoAprovacao(media);
            if (media !== 0) {
                try {

                    await User.create({
                        matricula: matricula,
                        nomecompleto: nome,
                        nota1,
                        nota2,
                        media,
                        aprovado
                    });
                    res.status(201).json({ message: 'Usuário criado com sucesso!' });
                } catch (err) {
                    res.status(500).json({ error: 'Erro ao criar usuário.' });
                }
            } else {
                res.status(400).json({ error: 'Nota inválida, deve ser numérica.' });
            }
        } else {
            res.status(400).json({ error: 'Campo obrigatório não informado.' });
        }
    })
    .put(async (req, res) => {
        const { id, matricula, nome, nota1, nota2 } = req.body;
        try {
            // Verifica se o usuário com o id especificado existe no banco de dados
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return res.status(404).json({ error: `id inexistente no banco` });
            }

            // Calcula a média e verifica se as notas são numéricas
            const media = calculaMedia(nota1, nota2);
            if (media === 0) {
                return res.status(400).json({ error: 'Nota inválida, deve ser numérica.' });
            }
            const aprovado = estadoAprovacao(media);
            
            // Atualiza o usuário com os novos valores
            await user.update({ matricula, nomecompleto: nome, nota1, nota2, media, aprovado });

            return res.status(200).json({ message: 'Usuário atualizado!' });
        } catch (error) {
            return res.status(500).json(error);
        }
    })
    .delete(async (req, res) => {
        const { id } = req.body;
        if (id) {
            try {
                const result = await User.findOne({ where: { id } });
                if (!result) {
                    res.status(404).json({ error: `id inexistente no banco` });
                    return;
                }
                await User.destroy({ where: { id } });
                res.status(200).json({ message: `usuário deletado!` });
            } catch (err) {
                res.status(500).json({ error: `${err.message}` });
            }
        } else {
            res.status(400).json({ error: 'Campo obrigatório não informado.' });
        }
    })
    
// função para validar se o usuário informado está aprovado
function estadoAprovacao(media) {
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