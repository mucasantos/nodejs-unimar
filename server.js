// Criar um servidor basico
const http = require ("http");
const fs = require('fs');

const server = http.createServer((req, res)=>{
    
    console.log(req.url)

    if(req.url === '/users') {
        res.setHeader("Content-type", "text/plain");
        res.write("Devolvendo usuários...");
        res.end();
    }

    // Criando metodo POST
    if(req.url === '/user' && req.method === 'POST'){

        const body = [];
        
        req.on("data", chunk => body.push(chunk))
        
        req.on("end", ()=>{
            const data = Buffer.concat(body).toString();
            console.log(data)
            fs.writeFileSync("mensagem.txt", data)
            res.end("Mensagem salva!")
        })

        res.setHeader("Content-type", "text/plain");
        res.write("Criei um usuário");
        res.end();
    }

    // res.write("Olá, este é um servidor NodeJS");
    // res.end();
})

// ouvir/publicar meu servidor
server.listen(3000);

