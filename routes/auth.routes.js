//Rotas de auth

const express = require('express')
const router = express.Router()

const authController = require('../controllers/AuthController')

//Registrar
router.post('/register', (req, res, next) => authController.register(req, res, next))
//Login
router.post('/login', (req, res, next) => authController.login(req, res, next))


// Perfil

module.exports = router