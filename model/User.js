const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const UserHistory = require('./UserHistory');

// aqui eu extendo User de Model e defino uma função customizada para deleção de usuários.
class User extends Model {
    static async deleteUser(id) {
        const user = await this.findByPk(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        await UserHistory.create({
            matricula: user.matricula,
            nomecompleto: user.nomecompleto,
            nota1: user.nota1,
            nota2: user.nota2,
            media: user.media,
            aprovado: user.aprovado,
            operacao: 'exclusao'
        });

        await user.destroy();
    }
}

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

// este metodo vai armazenar uma copia do usuário dentro de usuarios_historico quando ele for criado na tabela usuarios
User.afterCreate((user, options) => {
    UserHistory.create({
        matricula: user.matricula,
        nomecompleto: user.nomecompleto,
        nota1: user.nota1,
        nota2: user.nota2,
        media: user.media,
        aprovado: user.aprovado,
        operacao: 'insercao'
    });
});

// este metodo vai armazenar uma copia do usuário dentro de usuarios_historico quando ele for atualizado na tabela usuarios
User.afterUpdate((user, options) => {
    UserHistory.create({
        matricula: user.matricula,
        nomecompleto: user.nomecompleto,
        nota1: user.nota1,
        nota2: user.nota2,
        media: user.media,
        aprovado: user.aprovado,
        operacao: 'atualizacao'
    });
});

module.exports = User;
