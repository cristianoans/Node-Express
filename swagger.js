const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const User = require('./model/User');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Node Express Desafio SoulCode',
            version: '1.0.0',
            description: 'API para gerenciamento de alunos',
        },
        basePath: '/',
    },
    apis: ['./routes/*.js']
}


const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
