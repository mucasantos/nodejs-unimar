//Conectar com o DB


const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'escola',
    'root',
    '',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
    }
)

module.exports = sequelize;