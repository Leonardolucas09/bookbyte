export const TAMANHO_MINIMO_SENHA = 6;

export const FORCA_SENHA = { VAZIA: 0, FRACA: 1, MEDIA: 2, FORTE: 3 };

export function calcularForcaSenha(senha) {
    if (!senha) return FORCA_SENHA.VAZIA;
    if (senha.length < TAMANHO_MINIMO_SENHA) return FORCA_SENHA.FRACA;

    const temLetra = /\p{L}/u.test(senha);
    const temNumero = /\d/.test(senha);
    if (senha.length >= 8 && temLetra && temNumero) return FORCA_SENHA.FORTE;

    return FORCA_SENHA.MEDIA;
}
