const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');

class User extends Model { }

User.init({
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
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: true
});

module.exports = User;
