import express from "express";
import cors from "cors";
import { buscarLivros } from "./openLibrary.js";
import { cadastrar, entrar } from "./usuarios.js";
import { verificarLogin } from "./verificarLogin.js";
import { listarEstante, adicionarLivro, atualizarStatus } from "./estante.js";

const app = express();
app.use(cors()); // deixa o front-end (Vue) chamar esta API
app.use(express.json()); // permite ler o corpo das requisições em JSON

// Conta do usuário
app.post("/api/cadastro", cadastrar);
app.post("/api/login", entrar);

// Estante: só funciona com login, e cada usuário vê só a dele
app.get("/api/estante", verificarLogin, listarEstante);
app.post("/api/estante", verificarLogin, adicionarLivro);
app.patch("/api/estante/:id", verificarLogin, atualizarStatus);

// Exemplo: GET http://localhost:3000/api/livros/busca?q=duna
app.get("/api/livros/busca", async (req, res) => {
    const termo = (req.query.q ?? "").trim();

    if (termo.length < 2) {
        return res.status(400).json({ erro: "Digite pelo menos 2 letras para buscar." });
    }

    try {
        const livros = await buscarLivros(termo);
        // Se não achou nada, o front oferece o cadastro manual
        res.json({ livros, cadastroManual: livros.length === 0 });
    }
    catch (erro) {
        // Open Library fora do ar ou lenta: o front também oferece o cadastro manual (ADR-005)
        console.error(erro.message);
        res.status(503).json({ erro: "Não foi possível buscar na Open Library agora.", cadastroManual: true });
    }
});

// Se der algum erro inesperado (ex.: MySQL desligado), responde com uma mensagem clara
// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
    console.error(erro.message);
    res.status(500).json({ erro: "Erro no servidor. Confira se o MySQL está ligado." });
});

const porta = process.env.PORT ?? 3000;
app.listen(porta, () => console.log(`API rodando em http://localhost:${porta}`));
