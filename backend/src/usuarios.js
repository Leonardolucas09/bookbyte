import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { banco } from "./banco.js";

// POST /api/cadastro
export async function cadastrar(req, res) {
    const nomeUsuario = (req.body.nomeUsuario ?? "").trim();
    const email = (req.body.email ?? "").trim().toLowerCase();
    const senha = req.body.senha ?? "";

    if (!nomeUsuario || !email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos." });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ erro: "Digite um e-mail válido." });
    }
    if (senha.length < 6) {
        return res.status(400).json({ erro: "A senha precisa ter pelo menos 6 caracteres." });
    }

    // Não deixa criar duas contas com o mesmo e-mail ou nome de usuário
    const [existentes] = await banco.query(
        "SELECT id FROM usuario WHERE email = ? OR nome_usuario = ?",
        [email, nomeUsuario],
    );
    if (existentes.length > 0) {
        return res.status(409).json({ erro: "Este e-mail ou nome de usuário já está em uso." });
    }

    // Guarda só o hash da senha (ADR-006)
    const senhaHash = await bcrypt.hash(senha, 10);

    await banco.query(
        "INSERT INTO usuario (nome_usuario, email, senha_hash) VALUES (?, ?, ?)",
        [nomeUsuario, email, senhaHash],
    );

    res.status(201).json({ mensagem: "Conta criada com sucesso." });
}

// POST /api/login
// "login" pode ser o e-mail ou o nome de usuário
export async function entrar(req, res) {
    const login = (req.body.login ?? "").trim().toLowerCase();
    const senha = req.body.senha ?? "";

    if (!login || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos." });
    }

    const [usuarios] = await banco.query(
        "SELECT * FROM usuario WHERE email = ? OR LOWER(nome_usuario) = ?",
        [login, login],
    );
    const usuario = usuarios[0];

    const senhaCorreta = usuario && await bcrypt.compare(senha, usuario.senha_hash);

    // A mensagem não diz se o erro foi no e-mail ou na senha (especificação de casos de uso)
    if (!senhaCorreta) {
        return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    // O token prova quem é o usuário nas próximas requisições
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
        token,
        usuario: { id: usuario.id, nomeUsuario: usuario.nome_usuario, email: usuario.email },
    });
}
