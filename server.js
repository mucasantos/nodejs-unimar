//Utilizar o express
/**
 * Resolver problemas de criação de ROTA com Ifs....
 * Tratamento JSON
 * Roteamento (Router)
 * Paramêtros nativos (não preciso fazer IF para "pegar params") => req.params
 * Começar a separar as responsabilidades => Controller e Routes
 * Tratamento de erro centralizado!
 */
//Padrão CommomJS

const express = require('express')
const path = require('path')
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//rotas
const alunosRoutes = require('./routes/alunos.routes')
//resolvendo o PARSE JSON - middlewares globais
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

//Nossas rotas

//Usar roteamento (ROUTER)

app.use('/alunos', alunosRoutes)

//Middleware global - sempre no final.
app.use((req, res) => {
    res.status(404).json({ mensagem: "Rota não encontrada..." })
})

app.use((err, req, res)=> {
    console.log(err)
    res.status(500).json({ mensagem: err })
})

//Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`)
})