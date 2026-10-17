//Iniciar o express e servir as rotas
const express = require('express')
//routes
const routes = require('./routes')

const app = express()

app.use(express.json())

//Rotas Api
app.use('/api', routes)

//404

//tratamento de erros

module.exports = app