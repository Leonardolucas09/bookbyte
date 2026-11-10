import express from "express";
import cors from "cors";
import { buscarLivros } from "./openLibrary.js";

const app = express();
app.use(cors()); // deixa o front-end (Vue) chamar esta API

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

const porta = process.env.PORT ?? 3000;
app.listen(porta, () => console.log(`API rodando em http://localhost:${porta}`));
