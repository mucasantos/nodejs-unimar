const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/auth')
const autenticar = (req, res, next) => {
    console.log('Passou em autenticar...')

    //Está autenticado? => passa (next) não? erro!

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido!!' })
    }

    const [scheme, token] = authHeader.split(' ')
    if (!token || scheme !== 'Bearer') {
        return res.status(401).json({ error: 'Formato de Token invalido!!' })
    }

    try {
        //decodificar o token
        const decodedToken = jwt.verify(token, jwtSecret)

        req.usuario = {
            id: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role
        }
        return next()
    } catch (error) {
        next(error)
    }
}

module.exports = autenticar