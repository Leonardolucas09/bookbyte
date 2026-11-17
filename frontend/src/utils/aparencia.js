const CHAVE = "aparencia";

export function aplicarAparencia({ tema, fonteLeitura, tamanhoTexto }) {
    const html = document.documentElement;
    html.dataset.tema = tema;
    html.dataset.fonte = fonteLeitura;
    html.dataset.tamanho = tamanhoTexto;
    localStorage.setItem(CHAVE, JSON.stringify({ tema, fonteLeitura, tamanhoTexto }));
}

// Usa a cópia do navegador para a tela já abrir com o tema certo, antes da API responder
export function aplicarAparenciaSalva() {
    try {
        const salva = JSON.parse(localStorage.getItem(CHAVE));
        if (salva) aplicarAparencia(salva);
    }
    catch {
        localStorage.removeItem(CHAVE);
    }
}

export function limparAparencia() {
    localStorage.removeItem(CHAVE);
    const html = document.documentElement;
    delete html.dataset.tema;
    delete html.dataset.fonte;
    delete html.dataset.tamanho;
}
