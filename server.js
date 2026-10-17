// Server -> conecta / autentica o banco e cria o server

const app = require('./app')

app.listen(3000, () => {
    console.log('Servidor no ar!')
})