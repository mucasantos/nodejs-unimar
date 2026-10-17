const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
},
    {
        tableName: 'usuarios',
        timestamps: true,
    })

module.exports = Usuario