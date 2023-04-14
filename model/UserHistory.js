const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class UserHistory extends Model { }

UserHistory.init({
    matricula: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nomecompleto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nota1: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    nota2: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    media: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    aprovado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    operacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'UserHistory',
    tableName: 'usuarios_historico',
    timestamps: false
});

module.exports = UserHistory;
