const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const usuarios = require('./routes/usuarios');

const app = express();

// Crie um stream de escrita para os logs do Morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'morgan.log'), { flags: 'a' });

// Adicione o middleware do Morgan ao aplicativo
app.use(morgan('combined', { stream: accessLogStream }));

// configura o método de recebimento das requisições para JSON
app.use(express.json());

// cria a rota /usuarios e chama as rotas dentro do arquivo usuarios.js
app.use('/usuarios', usuarios);

app.listen(3000, () => {
  console.log(`Servidor iniciado na porta 3000`);
});
