import { banco } from "./banco.js";

const STATUS_VALIDOS = ["Quero Ler", "Lendo", "Lido", "Abandonei"];

// Busca os livros da estante de um usuário, no formato que o front usa
async function buscarItens(usuarioId, itemId) {
    let sql = `
        SELECT
            item_estante.id,
            livro.titulo, livro.autor, livro.editora, livro.ano, livro.paginas, livro.isbn, livro.capa,
            item_estante.status_leitura AS statusLeitura,
            item_estante.paginas_lidas AS paginasLidas,
            item_estante.atualizado_em AS atualizadoEm
        FROM item_estante
        JOIN livro ON livro.id = item_estante.livro_id
        WHERE item_estante.usuario_id = ?`;
    const valores = [usuarioId];

    if (itemId) {
        sql += " AND item_estante.id = ?";
        valores.push(itemId);
    }

    const [itens] = await banco.query(sql, valores);
    return itens;
}

// GET /api/estante
export async function listarEstante(req, res) {
    const itens = await buscarItens(req.usuarioId);
    res.json(itens);
}

// POST /api/estante  (corpo: o livro que veio da busca)
export async function adicionarLivro(req, res) {
    const livro = req.body;

    if (!livro.titulo) {
        return res.status(400).json({ erro: "O livro precisa ter um título." });
    }

    // 1. O livro já está salvo no banco? Procura pelo título e autor.
    const [encontrados] = await banco.query(
        "SELECT id FROM livro WHERE titulo = ? AND autor <=> ?",
        [livro.titulo, livro.autor ?? null],
    );

    let livroId;
    if (encontrados.length > 0) {
        livroId = encontrados[0].id;
    }
    else {
        // 2. Se não está, salva uma cópia dos dados da Open Library (ADR-005)
        const [resultado] = await banco.query(
            "INSERT INTO livro (titulo, autor, editora, ano, paginas, isbn, capa) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [livro.titulo, livro.autor ?? null, livro.editora ?? null, livro.ano ?? null,
                livro.paginas ?? null, livro.isbn ?? null, livro.capa ?? null],
        );
        livroId = resultado.insertId;
    }

    // 3. Coloca o livro na estante do usuário
    try {
        const [resultado] = await banco.query(
            "INSERT INTO item_estante (usuario_id, livro_id) VALUES (?, ?)",
            [req.usuarioId, livroId],
        );
        const [item] = await buscarItens(req.usuarioId, resultado.insertId);
        res.status(201).json(item);
    }
    catch (erro) {
        if (erro.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ erro: "Este livro já está na sua estante." });
        }
        throw erro;
    }
}

// PATCH /api/estante/:id  (corpo: { statusLeitura })
export async function atualizarStatus(req, res) {
    const { statusLeitura } = req.body;

    if (!STATUS_VALIDOS.includes(statusLeitura)) {
        return res.status(400).json({ erro: "Status inválido." });
    }

    // O "usuario_id = ?" garante que ninguém mexe na estante de outra pessoa
    const [resultado] = await banco.query(
        "UPDATE item_estante SET status_leitura = ? WHERE id = ? AND usuario_id = ?",
        [statusLeitura, req.params.id, req.usuarioId],
    );

    if (resultado.affectedRows === 0) {
        return res.status(404).json({ erro: "Livro não encontrado na sua estante." });
    }

    const [item] = await buscarItens(req.usuarioId, req.params.id);
    res.json(item);
}
