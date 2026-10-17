//Iniciar o express e servir as rotas
const express = require('express')
const path = require('path')
//routes upload
const uploadRoutes = require('./routes/upload.routes')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))


//Rotas Api

app.use('/api/upload', uploadRoutes)

//404

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada!' })

})

//tratamento de erros
app.use((error, req, res, next) => {
    if (error.status === 400 && 'body' in error) {
        res.status(400).json({ message: 'Verifique o BODY de sua requisição!!' })
    }
    res.status(error.status || 500).json({ error: error, message: 'Ocorreu um erro no servidor!' })
})


module.exports = app