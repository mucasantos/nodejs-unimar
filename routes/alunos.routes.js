//Gerenciar as rotas da aplicacao

const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res) => {

    try {
        const [rows] = await db.query('SELECT * FROM alunos ORDER by id DESC')
        return res.status(200).json(rows)
    } catch (error) {

    }
})

//Post -> 

module.exports = router;