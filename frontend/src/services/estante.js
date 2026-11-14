import { ref } from "vue";
import { pegarEstante, salvarNaEstante, mudarStatus } from "./api.js";

// Livros da estante do usuário logado. Ficam salvos no banco, pela API.
export const estante = ref([]);

export async function carregarEstante() {
    estante.value = await pegarEstante();
}

export async function adicionarNaEstante(livro) {
    const novoLivro = await salvarNaEstante(livro);
    estante.value.push(novoLivro);
}

export async function atualizarStatus(id, statusLeitura) {
    const livroAtualizado = await mudarStatus(id, statusLeitura);
    const posicao = estante.value.findIndex(item => item.id === id);
    estante.value[posicao] = livroAtualizado;
}

export function estaNaEstante(livro) {
    return estante.value.some(item => item.titulo === livro.titulo && item.autor === livro.autor);
}
