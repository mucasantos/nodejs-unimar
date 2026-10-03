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
/* 

const server = http.createServer(async (req, res) => {

    //Pequena doc das rotas

    try {
        if (req.url === '/' && req.method === 'GET') {
            return sendJson(res, 200, {
                mensagem: 'API de alunos - Node.js HTTP puro + MySql',
                rotas: [
                    { metodo: 'GET', url: '/alunos', descricao: 'Rota que devolve os alunos' },
                    { metodo: 'GET', url: '/alunos:/id', descricao: 'Rota que devolve aluno por ID' },
                    { metodo: 'POST', url: '/alunos', descricao: 'Cadastra aluno' },
                    { metodo: 'PUT', url: '/alunos:/:id', descricao: 'Atualiza aluno pelo ID' },
                    { metodo: 'DELETE', url: '/alunos/:id', descricao: 'Remove pelo ID' }
                ]
            })
        }

        //Criar as rotas CRUD
        //Get - Todos alunos
        if (req.url === '/alunos' && req.method === 'GET') {
            const [rows] = await db.query('SELECT * FROM alunos ORDER by id DESC')
            return sendJson(res, 200, rows)
        }

        //ByID
        if ((req.url).startsWith('/alunos/') && req.method === 'GET') {
            const id = (req.url).split('/')[2]
            //Recurso => acesso ao DB, consumo de memória... 
            if (!id || isNaN(id)) {
                return sendJson(res, 404, { message: "ID inválido!" })
            }
            const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id])

            if (rows.length === 0) {
                return sendJson(res, 404, { message: "Aluno não encontrado" })
            }
            return sendJson(res, 200, rows)
        }

        //Atividade 01 -> Criar as outras rotas
        // POST para salvar um aluno

        if (req.url === '/alunos' && req.method === 'POST') {

            const bodyJson = await getRequestBoby(req)
            //Recurso => acesso ao DB, consumo de memória... 

            console.log(bodyJson)
            //Pegar os dados e fazer um insert na tabela

            const { nome, email, matricula, curso } = bodyJson;

            // validacao de campos => Se o front nao enviar alguma informação

            if (!nome || !email || !matricula || !curso) {
                return sendJson(res, 400, { messagem: "Campos obrigatórios: nome, email, matricula, curso" })
            }

            const [result] = await db.query("INSERT INTO alunos (nome, email, matricula, curso) VALUES (?, ?, ?,?)", [nome, email, matricula, curso])

            return sendJson(res, 201, {
                mensagem: "Aluno inserido com sucesso",
                id: result.insertId,
                aluno: { id: result.insertId, nome, email, matricula, curso }
            })
        }

        if ((req.url).startsWith('/alunos/') && req.method === 'PUT') {

            const id = (req.url).split('/')[2]
            //Recurso => acesso ao DB, consumo de memória... 
            if (!id || isNaN(id)) {
                return sendJson(res, 400, { message: "ID inválido!" })
            }

            const bodyJson = await getRequestBoby(req)

            const { nome, email, matricula, curso } = bodyJson;

            const [result] = await db.query("UPDATE alunos SET nome = ?, email= ?, matricula= ?, curso =? where id = ?", [nome, email, matricula, curso, id])

            //Linha que ocorreu o update

            if (result.affectedRows === 0) {
                return sendJson(res, 404, { message: "Aluno não existe na base de dados!" })
            }

            return sendJson(res, 200, {
                mensagem: "Aluno atualizado com sucesso",
                id: id,
                aluno: { id: id, nome, email, matricula, curso }
            })

        }

        if ((req.url).startsWith('/alunos/') && req.method === 'DELETE') {

            const id = (req.url).split('/')[2]
            //Recurso => acesso ao DB, consumo de memória... 
            if (!id || isNaN(id)) {
                return sendJson(res, 400, { message: "ID inválido!" })
            }

            const [result] = await db.query("DELETE FROM alunos where id = ?", [id])
            //Linha que ocorreu o update
            if (result.affectedRows === 0) {
                return sendJson(res, 404, { message: "Aluno não existe na base de dados!" })
            }
            return sendJson(res, 200, {
                messagem: `Aluno ID ${id} exluido com sucesso!`
            })
        }
        return sendJson(res, 404, { message: `Rota ${req.url} e método ${req.method} não existem!` })
    } catch (error) {
        console.error(error)
        return sendJson(res, 500, { messagem: "Erro interno", detalhe: error.message })
    }
})

//publicar o meu server!

server.listen(3000);
 */