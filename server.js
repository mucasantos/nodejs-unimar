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
const app = express();
const PORT = 3000;

//rotas
const alunosRoutes = require('./routes/alunos.routes')
//resolvendo o PARSE JSON - middlewares globais
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Nossas rotas
//Usar roteamento (ROUTER)
app.use('/alunos', alunosRoutes)

//Middleware global - sempre no final.
app.use((req, res) => {
    res.status(404).json({ messagem: "Rota não encontrada..." })
})

//Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`)
})