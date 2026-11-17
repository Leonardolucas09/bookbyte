import { ref } from "vue";
import { pegarEstante, salvarNaEstante, salvarAtualizacaoLeitura } from "./api.js";

// Livros da estante do usuário logado. Ficam salvos no banco, pela API.
export const estante = ref([]);

// Fica true quando a estante terminou de carregar
export const estanteCarregada = ref(false);

export async function carregarEstante() {
    estante.value = await pegarEstante();
    estanteCarregada.value = true;
}

export async function adicionarNaEstante(livro) {
    const novoLivro = await salvarNaEstante(livro);
    estante.value.push(novoLivro);
}

export async function atualizarLeitura(id, paginasLidas, descricaoLeitura, statusLeitura) {
    const livroAtualizado = await salvarAtualizacaoLeitura(id, paginasLidas, descricaoLeitura, statusLeitura);
    const posicao = estante.value.findIndex(item => item.id === id);
    if (posicao !== -1) estante.value[posicao] = livroAtualizado;
    return livroAtualizado;
}

export function estaNaEstante(livro) {
    return estante.value.some(item => item.titulo === livro.titulo && item.autor === livro.autor);
}
