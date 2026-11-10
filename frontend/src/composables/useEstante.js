// Livros da estante do usuário.
// Por enquanto ficam guardados no navegador (localStorage), porque ainda não temos banco.
// Quando o banco existir, só este arquivo precisa mudar.
import { ref, watch } from "vue";

const CHAVE = "bookbyte-estante";

function carregar() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE)) ?? [];
    }
    catch {
        return [];
    }
}

// Fica fora da função para todas as telas usarem a mesma lista
const livros = ref(carregar());

watch(livros, (novaLista) => {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(novaLista));
    }
    catch {
        // Se o navegador bloquear o armazenamento, a estante só não fica salva
    }
}, { deep: true });

// Identifica o livro pelo ISBN ou, se não tiver, pelo título + autor
const idDoLivro = livro => livro.isbn ?? `${livro.titulo}-${livro.autor}`;

export function useEstante() {
    const estaNaEstante = livro => livros.value.some(item => item.id === idDoLivro(livro));

    const adicionar = (livro) => {
        if (estaNaEstante(livro)) return;
        livros.value.push({
            ...livro,
            id: idDoLivro(livro),
            statusLeitura: "Quero Ler",
            paginasLidas: 0,
        });
    };

    return { livros, estaNaEstante, adicionar };
}
