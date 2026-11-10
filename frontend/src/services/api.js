// Endereço da nossa API (back-end)
const URL_API = "http://localhost:3000";

// Busca livros na nossa API, que busca na Open Library
export async function buscarLivros(termo) {
    const resposta = await fetch(URL_API + "/api/livros/busca?q=" + termo);
    const dados = await resposta.json();
    return dados;
}
