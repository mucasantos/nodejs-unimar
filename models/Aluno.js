const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')


const Aluno = sequelize.define('Aluno', {
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
        allowNull: false,
        unique: true
    },
    matricula: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    //Modelo atual, salvamos o nome do curso (modelo RUIM!!)
    //O curso deve se relacionar com o aluno, através de uma nova table
    cursoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'curso_id',
        references: {
            model: 'cursos',
            key: 'id'
        }
    }
},
    {
        tableName: 'alunos',
        timestamps: true,
    })

module.exports = Aluno