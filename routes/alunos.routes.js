const express = require('express');
const router = express.Router();
const controller = require('../controllers/alunos.controller');

// Rotas Web (Server-Side Rendering com EJS)
router.get('/', controller.renderListarAlunos);
router.get('/novo', controller.renderNovoAluno);
router.post('/', controller.criarAluno);
router.get('/editar/:id', controller.renderEditarAluno);
router.post('/editar/:id', controller.atualizarAluno);
router.post('/excluir/:id', controller.excluirAluno);

module.exports = router;
