//Responsavel por registrar, login, perfil

const { Usuario } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtExpiresIn, jwtSecret } = require('../config/auth')

class AuthController {

    async login(req, res, next) {

        try {

            //Receber os dados da REQ
            const { email, senha } = req.body

            if (!email || !senha) {
                return res.status(400).json({ error: 'Enviar as Credenciais corretas!! ' })
            }

            // Procurar no DB
            const user = await Usuario.findOne({ where: { email } })

            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas!' })
            }

            //Verificar a senha
            const senhaValida = await bcrypt.compare(senha, user.senha)

            if (!senhaValida) {
                return res.status(401).json({ error: 'Credenciais inválidas!' })
            }
            //Gerar um token
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            },
                jwtSecret,
                { expiresIn: jwtExpiresIn })
            //retornar sucesso ou nao!
            return res.status(200).json({ message: 'Login com sucesso!!', token, })

        } catch (error) {
            next(error)
        }
    }

    async register(req, res, next) {
        try {
            //Criar um user no DB
            const { email, nome, senha, role } = req.body
            //validacoes

            if (!email || !nome || !senha) {
                return res.status(400).json({ error: 'Dados incompletos!' })
            }

            const user = await Usuario.findOne({ where: { email } })
            if (user) {
                return res.status(400).json({ error: 'Email já cadastrado!!' })
            }
            //Criptogragar a senha!!
            const senhaHash = await bcrypt.hash(senha, 10)

            //criar user
            const newUser = await Usuario.create({
                nome, email, senha: senhaHash, role: role || 'user'
            })
            return res.status(201).json({
                message: 'Cadastro com sucesso!', user: {
                    id: newUser.id,
                    nome: newUser.nome
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()