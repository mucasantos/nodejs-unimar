const db = require('../db');

// [VIEW] Listar todos os alunos
const renderListarAlunos = async (req, res, next) => {
    try {
        const [alunos] = await db.query('SELECT * FROM alunos ORDER BY id DESC');
        return res.render('alunos/index', {
            alunos: alunos,
            titulo: 'Lista de Alunos'
        });
    } catch (error) {
        next(error);
    }
};

// [VIEW] Formulário de criação de novo aluno
const renderNovoAluno = (req, res) => {
    return res.render('alunos/form', {
        titulo: 'Novo Aluno',
        isEdit: false,
        aluno: {}
    });
};

// [ACTION] Criar novo aluno
const criarAluno = async (req, res, next) => {
    try {
        const { nome, email, matricula, curso } = req.body;

        if (!nome || !email || !matricula || !curso) {
            return res.render('alunos/form', {
                titulo: 'Novo Aluno',
                isEdit: false,
                aluno: req.body,
                erro: 'Todos os campos são obrigatórios!'
            });
        }

        await db.query(
            'INSERT INTO alunos (nome, email, matricula, curso) VALUES (?, ?, ?, ?)',
            [nome, email, matricula, curso]
        );

        return res.redirect('/alunos');
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.render('alunos/form', {
                titulo: 'Novo Aluno',
                isEdit: false,
                aluno: req.body,
                erro: 'E-mail ou matrícula já cadastrados!'
            });
        }
        next(error);
    }
};

// [VIEW] Formulário de edição de aluno
const renderEditarAluno = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.redirect('/alunos');
        }

        return res.render('alunos/form', {
            titulo: 'Editar Aluno',
            isEdit: true,
            aluno: rows[0]
        });
    } catch (error) {
        next(error);
    }
};

// [ACTION] Atualizar dados do aluno
const atualizarAluno = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nome, email, matricula, curso } = req.body;

        await db.query(
            'UPDATE alunos SET nome = ?, email = ?, matricula = ?, curso = ? WHERE id = ?',
            [nome, email, matricula, curso, id]
        );

        return res.redirect('/alunos');
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.render('alunos/form', {
                titulo: 'Editar Aluno',
                isEdit: true,
                aluno: { id, ...req.body },
                erro: 'E-mail ou matrícula já pertencem a outro aluno!'
            });
        }
        next(error);
    }
};

// [ACTION] Excluir aluno
const excluirAluno = async (req, res, next) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM alunos WHERE id = ?', [id]);
        return res.redirect('/alunos');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    renderListarAlunos,
    renderNovoAluno,
    criarAluno,
    renderEditarAluno,
    atualizarAluno,
    excluirAluno
};
