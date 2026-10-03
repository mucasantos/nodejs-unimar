// Criar um servidor básico

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    console.log(req.url);

    // GET - Buscar usuários
    if (req.url === "/users" && req.method === "GET") {

        res.setHeader("Content-Type", "text/plain");
        res.write("Devolvendo usuarios....");
        res.end();

        return;
    }

    // POST - Criar usuário
    if (req.url === "/user" && req.method === "POST") {

        // Escrever o que recebeu em um arquivo
        const body = [];

        req.on("data", chunk => {
            body.push(chunk);
        });

        req.on("end", () => {

            const data = Buffer.concat(body).toString();

            console.log(data);

            // Salvar os dados recebidos
            fs.writeFileSync("mensagem.txt", data);

            res.setHeader("Content-Type", "text/plain");
            res.end("Criei um usuario! Mensagem salva!");

        });

        return;
    }

    // Caso a rota não exista
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Rota nao encontrada!");

});

// Publicar o meu server
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!");
});