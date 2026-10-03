//Gerenciar as rotas da aplicacao

//A responsabilidade desse arquivo, é conhecer rotas!!
//Ele não precisa conhever lógica de negócio (controllers)

const express = require('express')
const router = express.Router()
const alunosControllers = require('../controllers/alunos.controllers')

router.get('/', alunosControllers.listarAlunos)
router.get('/:id', alunosControllers.buscarAlunoByID)
router.post('/', alunosControllers.criarAluno)
router.put('/:id', alunosControllers.atualizarAluno)
router.delete('/:id', alunosControllers.apagarAluno)

module.exports = router;