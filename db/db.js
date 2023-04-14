const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');


const sequelize = new Sequelize('nodeexpressmysql', 'root', 'cris$#2260', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
  logging: (msg) => {
    const logMessage = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(path.join(__dirname, '../logs', 'sequelize.log'), logMessage);
  }
});

// Sincronize os modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabela sincronizada com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabela:', error);
  });

module.exports = sequelize;