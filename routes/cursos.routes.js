const express = require('express')
const router = express.Router()

const cursoController = require('../controllers/CursoController')

const autenticar = require('../middlewares/auth.middleware')

//Usar um middleware para verificar se o usuario está auth ou não => middleware usamos a palavra 'use'

router.use(autenticar)

router.get('/', (req, res, next) => cursoController.listar(req, res, next))
router.post('/', (req, res, next) => cursoController.criar(req, res, next))

module.exports = router