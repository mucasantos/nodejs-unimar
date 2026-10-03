//Criar um servidor básico
/**
 * Essa branch mostra um SERVIDOR PURO sem EXPRESS + CRUD com SQL "puro"
 * 
 * Demonstração didática desses módulos nativos
 * desafios e importancia de manter um código não CLEAN em que mistura:
 * Servidor, bando de dados, roteamento... TUDO junto!
 * 
 * CRUD simples de alunos de uma escola
 * 
 * Receber e enviar os dados JSON -> function que pega os dados e converte em JSON
 * Devolve os dados em formato JSON
 * 
 */

const http = require("http");
const fs = require('fs');
const db = require('./db')



const getRequestBoby = (req) => {

    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk)
        })
        //processar os dados da requisição
        req.on('end', () => {
            //Sem nada!
            if (chunks.length === 0) {
                resolve({})
            }
            try {
                const rawData = Buffer.concat(chunks).toString();
                const parseToJson = JSON.parse(rawData)
                resolve(parseToJson)
            }
            catch (error) {
                reject(new Error("Formato de JSON inválido"))
            }
        })
        req.on('error', (err) => {
            reject(err)
        })
    })
}

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(data))
}



const server = http.createServer(async (req, res) => {
    try {
        if (req.url === '/' && req.method === 'GET') {
            return sendJson(res, 200, {
                mensagem: 'API de alunos - Node.js HTTP puro + MySql',
                rotas: [
                    { metodo: 'GET', url: '/alunos', descricao: 'Rota que devolve os alunos' },
                    { metodo: 'GET', url: '/alunos/:id', descricao: 'Rota que devolve aluno por ID' },
                    { metodo: 'POST', url: '/alunos', descricao: 'Cadastra aluno' },
                    { metodo: 'PUT', url: '/alunos/:id', descricao: 'Atualiza aluno pelo ID' },
                    { metodo: 'DELETE', url: '/alunos/:id', descricao: 'Remove pelo ID' }
                ]
            });
        }

        if (req.url === '/alunos' && req.method === 'GET') {
            const [rows] = await db.query('SELECT * FROM alunos ORDER BY idalunos DESC');
            return sendJson(res, 200, rows);
        }

        if (req.url.startsWith('/alunos/') && req.method === 'GET') {
            const id = req.url.split('/')[2];
            if (!id || isNaN(id)) {
                return sendJson(res, 400, { message: "ID inválido!" });
            }
            const [rows] = await db.query('SELECT * FROM alunos WHERE idalunos = ?', [id]);

            if (rows.length === 0) {
                return sendJson(res, 404, { message: "Aluno não encontrado" });
            }
            return sendJson(res, 200, rows[0]);
        }

        if (req.url === '/alunos' && req.method === 'POST') {
            const body = await getRequestBoby(req);
            const { nome } = body;

            if (!nome) {
                return sendJson(res, 400, { message: "O campo 'nome' é obrigatório" });
            }

            const [result] = await db.query(
                'INSERT INTO alunos (nome) VALUES (?)',
                [nome]
            );

            return sendJson(res, 201, {
                message: "Aluno cadastrado com sucesso",
                idalunos: result.insertId,
                nome
            });
        }

        if (req.url.startsWith('/alunos/') && req.method === 'PUT') {
            const id = req.url.split('/')[2];

            if (!id || isNaN(id)) {
                return sendJson(res, 400, { message: "ID inválido!" });
            }

            const body = await getRequestBoby(req);
            const { nome } = body;

            if (!nome) {
                return sendJson(res, 400, { message: "O campo 'nome' é obrigatório" });
            }

            const [result] = await db.query(
                'UPDATE alunos SET nome = ? WHERE idalunos = ?',
                [nome, id]
            );

            if (result.affectedRows === 0) {
                return sendJson(res, 404, { message: "Aluno não encontrado para atualização" });
            }

            return sendJson(res, 200, { message: "Aluno atualizado com sucesso", idalunos: id, nome });
        }

        if (req.url.startsWith('/alunos/') && req.method === 'DELETE') {
            const id = req.url.split('/')[2];

            if (!id || isNaN(id)) {
                return sendJson(res, 400, { message: "ID inválido!" });
            }

            const [result] = await db.query('DELETE FROM alunos WHERE idalunos = ?', [id]);

            if (result.affectedRows === 0) {
                return sendJson(res, 404, { message: "Aluno não encontrado para remoção" });
            }

            return sendJson(res, 200, { message: "Aluno removido com sucesso" });
        }

        return sendJson(res, 404, { message: "Rota não encontrada" });

    } catch (error) {
        console.error("Erro interno:", error);
        return sendJson(res, 500, { message: "Erro interno no servidor", details: error.message });
    }
});

server.listen(3000);