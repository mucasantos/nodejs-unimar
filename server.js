//Criar um servidor básico

const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {

    console.log(req.url)

    if (req.url === '/users') {
        res.setHeader("Content-type", "text/plain");
        res.write("Devolvendo usuarios....");
        res.end();
    }

    //Criar método POST

    if (req.url === '/user' && req.method === 'POST'){
        //escrever o que recebeu num arquivo

        const body = [];

        req.on("data", chunk => body.push(chunk))

        req.on("end", ()=>{
            const data = Buffer.concat(body).toString();
            console.log(data)
            fs.writeFileSync("mensagem.txt", data)
            res.end("Mensagem salva!")
        })

        res.setHeader("Content-type", "text/plain");
        res.write("Criei um usuario!");
        res.end();
    }

    //res.write("Olá, este é um servidor NodeJS");
    //res.end();
})

//publicar o meu server!

server.listen(3000);
