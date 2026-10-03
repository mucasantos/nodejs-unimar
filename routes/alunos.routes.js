//Gerenciar as rotas da aplicacao

const express = require('express')
const router = express.Router()
const alunosControllers = require('../controllers/alunos.controllers')

router.get('/', alunosControllers.listarAlunos)
router.get('/:id', alunosControllers.buscarAlunoById)
router.post('/', alunosControllers.criarAluno)
router.put('/:id', alunosControllers.atualizarAlunoById)
router.delete('/:id', alunosControllers.removerAluno)

module.exports = router;