const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.status(200).json({

        message: 'API REST 2026 - Unimar',
        endpoints: {
            auth: {
                registro: 'POST /api',
                login: 'POST',
                perfil: 'GET'
            },
            alunos: {
                listar: 'GET'
            },
            professor: {
                listar: 'GET'
            }
        }
    })
})

module.exports = router