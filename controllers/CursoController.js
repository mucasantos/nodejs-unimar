const { Curso } = require('../models')

class CursoController {
    async listar(req, res, next) {
        try {
            const cursos = await Curso.findAll(
            )

            return res.status(200).json(cursos)
        } catch (error) {
            next(error)
        }
    }

    async criar(req, res, next) {
        try {
            const { nome, cargaHoraria } = req.body

            if (!nome || !cargaHoraria) {
                return res.status(400).json({ message: "Verique os campos!" })
            }
            const novoCurso = await Curso.create({ nome, cargaHoraria })
            return res.status(201).json({ message: "Curso criado com Sucesso!!", novoCurso })

        } catch (error) {
            next(error)
        }
    }

    async buscarPorId(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    async excluir(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CursoController()