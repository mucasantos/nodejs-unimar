

const db = require('../db')

const listarAlunos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM alunos ORDER by id DESC')
        return res.status(200).json(rows)
    } catch (error) {
    }
}

const buscarAlunoByID = async (req, res) => {
    const { id } = req.params //Vem do express!
    //Recurso => acesso ao DB, consumo de memória... 
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido!" })
    }
    const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id])

    if (rows.length === 0) {
        return res.status(200).json({ message: "Aluno não encontrado" })
    }
    return res.status(200).json(rows)
}

const criarAluno = async (req, res) => {
    const { nome, email, matricula, curso } = req.body;
    // validacao de campos => Se o front nao enviar alguma informação
    if (!nome || !email || !matricula || !curso) {
        return res.status(400).json({ messagem: "Campos obrigatórios: nome, email, matricula, curso" })
    }
    const [result] = await db.query("INSERT INTO alunos (nome, email, matricula, curso) VALUES (?, ?, ?,?)", [nome, email, matricula, curso])
    return res.status(201).json({
        mensagem: "Aluno inserido com sucesso",
        id: result.insertId,
        aluno: { id: result.insertId, nome, email, matricula, curso }
    })
}

const atualizarAluno = async (req, res) => {

    const { id } = req.params //Vem do express!
    //Recurso => acesso ao DB, consumo de memória... 
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "ID inválido!" })
    }

    const { nome, email, matricula, curso } = req.body;

    const [result] = await db.query("UPDATE alunos SET nome = ?, email= ?, matricula= ?, curso =? where id = ?", [nome, email, matricula, curso, id])

    //Linha que ocorreu o update

    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Aluno não existe na base de dados!" })
    }

    return res.status(200).json({
        mensagem: "Aluno atualizado com sucesso",
        id: id,
        aluno: { id: id, nome, email, matricula, curso }
    })
}

const apagarAluno = async (req, res) => {
    const { id } = req.params //Vem do express!
    //Recurso => acesso ao DB, consumo de memória... 
    if (!id || isNaN(id)) {
        return res.status(404).json({ message: "Id inválido" })
    }
    const [result] = await db.query("DELETE FROM alunos where id = ?", [id])
    //Linha que ocorreu o update
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Aluno não existe na base de dados!" })
    }
    return res.status(200).json({
        messagem: `Aluno ID ${id} exluido com sucesso!`
    })
}

module.exports = {
    listarAlunos,
    buscarAlunoByID,
    criarAluno,
    atualizarAluno,
    apagarAluno
}