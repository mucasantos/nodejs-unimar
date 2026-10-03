//Gerenciar as rotas da aplicacao

const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM alunos ORDER BY id DESC')
        return res.status(200).json(rows)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno', detalhe: error.message })
    }
})

// GET /alunos/:id -> aluno por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(id)) {
            return res.status(400).json({ mensagem: 'ID inválido!' })
        }

        const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id])

        if (rows.length === 0) {
            return res.status(404).json({ mensagem: 'Aluno não encontrado' })
        }

        return res.status(200).json(rows[0])
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno', detalhe: error.message })
    }
})

// POST /alunos -> cadastrar aluno
router.post('/', async (req, res) => {
    try {
        const { nome, email, matricula, curso } = req.body

        if (!nome || !email || !matricula || !curso) {
            return res.status(400).json({ mensagem: 'Campos obrigatórios: nome, email, matricula, curso' })
        }

        const [result] = await db.query(
            'INSERT INTO alunos (nome, email, matricula, curso) VALUES (?, ?, ?, ?)',
            [nome, email, matricula, curso]
        )

        return res.status(201).json({
            mensagem: 'Aluno inserido com sucesso',
            aluno: { id: result.insertId, nome, email, matricula, curso }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno', detalhe: error.message })
    }
})

// PUT /alunos/:id -> atualizar aluno
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(id)) {
            return res.status(400).json({ mensagem: 'ID inválido!' })
        }

        const { nome, email, matricula, curso } = req.body

        if (!nome || !email || !matricula || !curso) {
            return res.status(400).json({ mensagem: 'Campos obrigatórios: nome, email, matricula, curso' })
        }

        const [result] = await db.query(
            'UPDATE alunos SET nome = ?, email = ?, matricula = ?, curso = ? WHERE id = ?',
            [nome, email, matricula, curso, id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Aluno não existe na base de dados!' })
        }

        return res.status(200).json({
            mensagem: 'Aluno atualizado com sucesso',
            aluno: { id: Number(id), nome, email, matricula, curso }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno', detalhe: error.message })
    }
})

// DELETE /alunos/:id -> remover aluno
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(id)) {
            return res.status(400).json({ mensagem: 'ID inválido!' })
        }

        const [result] = await db.query('DELETE FROM alunos WHERE id = ?', [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Aluno não existe na base de dados!' })
        }

        return res.status(200).json({ mensagem: `Aluno ID ${id} excluído com sucesso!` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno', detalhe: error.message })
    }
})

module.exports = router;