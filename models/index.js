//Um aluno PERTENCE a um curso
//Curso TEM MUITOS Alunos

const sequelize = require('../config/database')
const Curso = require('./Curso')
const Aluno = require('./Aluno')
const Usuario = require('./Usuario')

Curso.hasMany(Aluno, { foreignKey: 'curso_id', as: 'alunos' })
Aluno.belongsTo(Curso, { foreignKey: 'curso_id', as: 'curso' })


module.exports = {
    sequelize,
    Curso,
    Aluno,
    Usuario
}