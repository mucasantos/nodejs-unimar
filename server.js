// Server -> conecta / autentica o banco e cria o server

const app = require('./app')
const { sequelize } = require('./models')

async function startServer() {

    try {
        console.log("Conectar com DB")
        await sequelize.authenticate()

        //Sincronizar tables
        await sequelize.sync({ alter: true })

        app.listen(3000, () => {
            console.log('Servidor no ar!')
        })
    } catch (error) {
        console.log('Erro ao iniciar SERVER!')
        console.log(error)

    }
}

startServer()