//Rotas de aluno precisa que o usuário esteja autenticado corretamente no sistema!

//Listar os alunos
//Buscar aluno por ID
//Criar um aluno
//Atualizar um aluno

//Deletar um aluno -> apenas ADMIN!!

const express = require('express')
const router = express.Router()
const autenticar = require('../middlewares/auth.middleware')

//Usar um middleware para verificar se o usuario está auth ou não => middleware usamos a palavra 'use'
router.use(autenticar)

const alunoController = require('../controllers/AlunoController')

router.get('/', (req, res, next) => alunoController.listar(req, res, next))
router.post('/', (req, res, next) => alunoController.criar(req, res, next))

module.exports = router