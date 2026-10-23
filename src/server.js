const express = require("express");
const connectDatabase = require("./config/database");
const Aluno = require("./models/Aluno");

const app = express();
const PORT = 3003;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SEJA BEM VINDO!");
});

app.get("/alunos", async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({
      mensagem: "Deu erro porra!!!",
      erro: error.message,
    });
  }
});

app.post("/addAluno", async (req, res) => {
  try {
    const { nome, curso } = req.body;

    if (!nome || !curso) {
      return res.status(400).json({
        mensagem: "os campos nome e curso são obrigatórios",
      });
    }

    const novoAluno = await Aluno.create({ nome, curso });

    res.status(201).json(novoAluno);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar pessoa.",
      erro: error.message,
    });
  }
});

// PUT - Atualizar aluno
app.put("/alunos/:id", async (req, res) => {
  try {
    const { nome, curso } = req.body;

    const alunoAtualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      { nome, curso },
      { new: true },
    );

    if (!alunoAtualizado) {
      return res.status(404).json({
        mensagem: "Aluno não encontrado.",
      });
    }

    res.status(200).json(alunoAtualizado);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar aluno.",
      erro: error.message,
    });
  }
});

// DELETE - Excluir aluno
app.delete("/alunos/:id", async (req, res) => {
  try {
    const alunoExcluido = await Aluno.findByIdAndDelete(req.params.id);

    if (!alunoExcluido) {
      return res.status(404).json({
        mensagem: "Aluno não encontrado.",
      });
    }

    res.status(200).json({
      mensagem: "Aluno excluído com sucesso!",
      aluno: alunoExcluido,
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao excluir aluno.",
      erro: error.message,
    });
  }
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Nao foi possivel iniciar a aplicacao.", error.message);
  }
}

startServer();
