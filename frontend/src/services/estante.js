import { ref } from "vue";

// Lista de livros da estante.
// Fica salva no navegador (localStorage) porque ainda não temos banco de dados.
export const estante = ref(JSON.parse(localStorage.getItem("estante")) || []);

export function adicionarNaEstante(livro) {
    const novoLivro = {
        ...livro,
        id: Date.now(),
        statusLeitura: "Quero Ler",
        paginasLidas: 0,
    };

    estante.value.push(novoLivro);
    localStorage.setItem("estante", JSON.stringify(estante.value));
}

export function estaNaEstante(livro) {
    return estante.value.some((item) => item.titulo === livro.titulo && item.autor === livro.autor);
}
