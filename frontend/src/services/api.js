// Endereço da nossa API (back-end)
const URL_API = "http://localhost:3000";

// Faz uma chamada para a API, já mandando o token de login.
// Se a API responder com erro, mostra a mensagem dela.
async function chamarApi(metodo, caminho, corpo) {
    const resposta = await fetch(URL_API + caminho, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: corpo ? JSON.stringify(corpo) : undefined,
    });
    const dados = await resposta.json();

    // Login venceu: manda a pessoa entrar de novo
    if (resposta.status === 401 && caminho !== "/api/login") {
        sair();
    }

    if (!resposta.ok) {
        throw new Error(dados.erro);
    }
    return dados;
}

// Busca livros na nossa API, que busca na Open Library
export function buscarLivros(termo) {
    return chamarApi("GET", "/api/livros/busca?q=" + termo);
}

// Conta
export function cadastrar(nomeUsuario, email, senha) {
    return chamarApi("POST", "/api/cadastro", { nomeUsuario, email, senha });
}

// "login" pode ser o e-mail ou o nome de usuário
export function entrar(login, senha) {
    return chamarApi("POST", "/api/login", { login, senha });
}

export function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/login"; // recarrega a página para limpar tudo da tela
}

// Estante do usuário logado
export function pegarEstante() {
    return chamarApi("GET", "/api/estante");
}

export function salvarNaEstante(livro) {
    return chamarApi("POST", "/api/estante", livro);
}

export function mudarStatus(id, statusLeitura) {
    return chamarApi("PATCH", "/api/estante/" + id, { statusLeitura });
}
