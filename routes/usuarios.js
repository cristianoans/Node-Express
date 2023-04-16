/**
 * @swagger
 * tags:
 *   name: Usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - matricula
 *         - nomecompleto
 *         - nota1
 *         - nota2
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do usuário, gerado automaticamente pelo banco de dados.
 *         matricula:
 *           type: string
 *           description: Matrícula do usuário.
 *           unique: true
 *         nomecompleto:
 *           type: string
 *           description: Nome completo do usuário.
 *         nota1:
 *           type: number
 *           description: Nota da primeira avaliação.
 *         nota2:
 *           type: number
 *           description: Nota da segunda avaliação.
 *         media:
 *           type: number
 *           description: Média das notas, calculado automaticamente com base nas notas informadas.
 *         aprovado:
 *           type: boolean
 *           description: Indica se o usuário foi aprovado ou não, calculado automaticamente com base na média (>=8).
 *       example:
 *         id: 1
 *         matricula: "00001"
 *         nomecompleto: "João da Silva"
 *         nota1: 7
 *         nota2: 8
 *         media: 7.5
 *         aprovado: false
 *     UserInput:
 *       type: object
 *       properties:
 *         matricula:
 *           type: string
 *         nome:
 *           type: string
 *         nota1:
 *           type: number
 *         nota2:
 *           type: number
 *       required:
 *         - matricula
 *         - nome
 *         - nota1
 *         - nota2 
 *       example:
 *         matricula: "00001"
 *         nomecompleto: "João da Silva"
 *         nota1: 7
 *         nota2: 8
 *     UserUpdate:
 *       type: object
 *       properties:
 *         matricula:
 *           type: string
 *         nome:
 *           type: string
 *         nota1:
 *           type: number
 *         nota2:
 *           type: number
 *       required:
 *         - matricula
 *         - nome
 *         - nota1
 *         - nota2 
 *       example:
 *         matricula: "00001"
 *         nomecompleto: "João da Silva"
 *         nota1: 7
 *         nota2: 8
 *     UserDelete:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *       required:
 *         - id
 *       example:
 *         id: 1
 */

/**
 * @swagger
 *
 * /usuarios:
 *   get:
 *     summary: listar_usarios
 *     description: Retorna uma lista de usuários com base nos parâmetros de consulta, caso nenhum seja informado, retorna a lista completa.
 *     tags: [Usuários]
 *     parameters:
 *       - in: query
 *         name: matricula
 *         schema:
 *           type: string
 *         description: Matrícula do usuário.
 *         readOnly: true
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome completo do usuário.
 *         readOnly: true
 *       - in: query
 *         name: media
 *         schema:
 *           type: number
 *         description: Média mínima das notas.
 *         readOnly: true
 *       - in: query
 *         name: aprovado
 *         schema:
 *           type: boolean
 *         description: Indica se o usuário foi aprovado ou não.
 *         readOnly: true
 *     responses:
 *       '200':
 *         description: Usuários listados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '400':
 *         description: Parâmetros inválidos.
 *       '500':
 *         description: Erro interno do servidor.
 *   post:
 *     summary: criar_usuario
 *     description: Cria um novo usuário no sistema.
 *     tags: [Usuários]
 *     requestBody:
 *       description: Objeto JSON com as informações do novo usuário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Parâmetros inválidos.
 *       '500':
 *         description: Erro interno do servidor.
 *   put:
 *     summary: atualiza_usuario
 *     description: Atualiza as informações de um usuário existente no sistema.
 *     tags: [Usuários]
 *     requestBody:
 *       description: Objeto JSON com as informações atualizadas do usuário.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Parâmetros inválidos.
 *       '404':
 *         description: Usuário não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 *   delete:
 *     summary: remove_usuario
 *     description: Deleta um usuário existente no sistema.
 *     tags: [Usuários]
 *     requestBody:
 *       description: Objeto JSON com o ID do usuário a ser deletado.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             required:
 *               - id
 */


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
        try {
            const { id } = req.body;
            await User.deleteUser(id);
            res.status(200).json({ message: 'Usuário deletado!' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'erro!' });
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