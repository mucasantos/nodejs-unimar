const { Aluno, Curso } = require('../models')

class AlunoController {
    async listar(req, res, next) {
        try {
            const alunos = await Aluno.findAll({
                include: [{
                    model: Curso,
                    as: 'curso',
                    attributes: ['id', 'nome', 'cargaHoraria']
                }],
                order: [['id', 'DESC']]
            })

            return res.status(200).json(alunos)
        } catch (error) {
            next(error)
        }
    }

    async criar(req, res, next) {
        try {

            const { nome, email, matricula, cursoId } = req.body

            if (!nome || !email || !matricula || !cursoId) {
                return res.status(400).json({ message: "Verique os campos!" })
            }

            //Sem esse IF abaixo, o erro é tratado de forma global, na hora de inserir o dado no DB!
            const curso = await Curso.findByPk(cursoId)
            if (!curso) {
                return res.status(400).json({ message: "Curso não cadastrado!!" })
            }
            const novoAluno = await Aluno.create({ nome, email, matricula, cursoId })

            return res.status(201).json({ message: "Aluno criado com Sucesso!!", novoAluno })

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

module.exports = new AlunoController()