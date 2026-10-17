const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Curso = sequelize.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cargaHoraria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    {
        tableName: 'cursos',
        timestamps: true,
    })

module.exports = Curso