const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.routes')
const alunosRoutes = require('./alunos.routes')
const cursosRoutes = require('./cursos.routes')

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

router.use('/auth', authRoutes)
router.use('/alunos', alunosRoutes)
router.use('/cursos', cursosRoutes)


module.exports = router