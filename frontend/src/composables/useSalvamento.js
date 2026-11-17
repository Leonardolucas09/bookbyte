import { ref } from "vue";

export function useSalvamento() {
    const salvando = ref(false);
    const mensagem = ref("");
    const erro = ref("");

    async function salvar(acao, textoSucesso) {
        salvando.value = true;
        mensagem.value = "";
        erro.value = "";
        try {
            await acao();
            mensagem.value = textoSucesso;
        }
        catch (e) {
            erro.value = e.message;
        }
        finally {
            salvando.value = false;
        }
    }

    return { salvando, mensagem, erro, salvar };
}
