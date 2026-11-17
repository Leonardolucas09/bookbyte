export function pegarUsuarioLogado() {
    return JSON.parse(localStorage.getItem("usuario")) || {};
}

export function guardarUsuarioLogado({ id, nomeUsuario, email }) {
    localStorage.setItem("usuario", JSON.stringify({ id, nomeUsuario, email }));
}

export function pegarIniciais(nome = "") {
    return nome.slice(0, 2).toUpperCase();
}
