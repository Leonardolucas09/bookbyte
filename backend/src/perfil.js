import { banco } from "./banco.js";

// Campos que o front pode alterar, com a coluna do banco e a regra de cada um.
// Só colunas desta lista entram no UPDATE, então o SQL montado é seguro.
const PREFERENCIAS = {
    metaLivros: { coluna: "meta_livros", valido: valor => Number.isInteger(valor) && valor >= 0 && valor <= 1000 },
    unidadeProgresso: { coluna: "unidade_progresso", valido: valor => ["paginas", "porcentagem"].includes(valor) },
    lembreteLeitura: { coluna: "lembrete_leitura", valido: valor => typeof valor === "boolean" },
    novidadesEmail: { coluna: "novidades_email", valido: valor => typeof valor === "boolean" },
    tema: { coluna: "tema", valido: valor => ["claro", "sepia", "escuro"].includes(valor) },
    fonteLeitura: { coluna: "fonte_leitura", valido: valor => ["lora", "inter"].includes(valor) },
    tamanhoTexto: { coluna: "tamanho_texto", valido: valor => ["pequeno", "medio", "grande"].includes(valor) },
};

async function buscarUsuario(usuarioId) {
    const [usuarios] = await banco.query("SELECT * FROM usuario WHERE id = ?", [usuarioId]);
    const usuario = usuarios[0];
    if (!usuario) return null;

    return {
        id: usuario.id,
        nomeUsuario: usuario.nome_usuario,
        email: usuario.email,
        preferencias: {
            metaLivros: usuario.meta_livros,
            unidadeProgresso: usuario.unidade_progresso,
            lembreteLeitura: Boolean(usuario.lembrete_leitura),
            novidadesEmail: Boolean(usuario.novidades_email),
            tema: usuario.tema,
            fonteLeitura: usuario.fonte_leitura,
            tamanhoTexto: usuario.tamanho_texto,
        },
    };
}

// GET /api/usuario
export async function mostrarUsuario(req, res) {
    const usuario = await buscarUsuario(req.usuarioId);
    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
    }
    res.json(usuario);
}

// PATCH /api/usuario/perfil  (corpo: { nomeUsuario, email })
export async function atualizarPerfil(req, res) {
    const nomeUsuario = (req.body.nomeUsuario ?? "").trim();
    const email = (req.body.email ?? "").trim().toLowerCase();

    if (!nomeUsuario || !email) {
        return res.status(400).json({ erro: "Preencha o nome e o e-mail." });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ erro: "Digite um e-mail válido." });
    }

    const [existentes] = await banco.query(
        "SELECT id FROM usuario WHERE (email = ? OR nome_usuario = ?) AND id <> ?",
        [email, nomeUsuario, req.usuarioId],
    );
    if (existentes.length > 0) {
        return res.status(409).json({ erro: "Este e-mail ou nome de usuário já está em uso." });
    }

    await banco.query(
        "UPDATE usuario SET nome_usuario = ?, email = ? WHERE id = ?",
        [nomeUsuario, email, req.usuarioId],
    );

    res.json(await buscarUsuario(req.usuarioId));
}

// PATCH /api/usuario/preferencias  (corpo: só os campos que mudaram)
export async function atualizarPreferencias(req, res) {
    const campos = Object.entries(req.body ?? {});

    if (campos.length === 0) {
        return res.status(400).json({ erro: "Nenhuma preferência enviada." });
    }

    const colunas = [];
    const valores = [];
    for (const [campo, valor] of campos) {
        const regra = PREFERENCIAS[campo];
        if (!regra || !regra.valido(valor)) {
            return res.status(400).json({ erro: `Valor inválido para "${campo}".` });
        }
        colunas.push(`${regra.coluna} = ?`);
        valores.push(valor);
    }

    await banco.query(
        `UPDATE usuario SET ${colunas.join(", ")} WHERE id = ?`,
        [...valores, req.usuarioId],
    );

    const usuario = await buscarUsuario(req.usuarioId);
    res.json(usuario.preferencias);
}
