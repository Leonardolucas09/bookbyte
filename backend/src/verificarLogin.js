import jwt from "jsonwebtoken";

// Roda antes das rotas que precisam de login.
// Confere o token enviado pelo front e descobre quem é o usuário.
export function verificarLogin(req, res, next) {
    // O front manda assim: Authorization: Bearer <token>
    const token = (req.headers.authorization ?? "").replace("Bearer ", "");

    try {
        const dados = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = dados.id;
        next();
    }
    catch {
        res.status(401).json({ erro: "Faça login novamente." });
    }
}
