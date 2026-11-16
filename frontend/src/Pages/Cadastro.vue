<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import ForcaSenha from "../components/ForcaSenha.vue";
import IconeCadeado from "../components/icons/IconeCadeado.vue";
import XButton from "../components/X-Button.vue";
import XInput from "../components/X-Input.vue";
import LayoutAutenticacao from "../layouts/LayoutAutenticacao.vue";
import { cadastrar } from "../services/api.js";
import { TAMANHO_MINIMO_SENHA } from "../utils/senha.js";

const router = useRouter();

const nomeUsuario = ref("");
const email = ref("");
const senha = ref("");
const confirmarSenha = ref("");
const aceitouTermos = ref(false);
const erro = ref("");
const enviando = ref(false);

const senhasCoincidem = computed(() => senha.value === confirmarSenha.value);

const validarFormulario = () => {
    if (!nomeUsuario.value || !email.value || !senha.value || !confirmarSenha.value) {
        return "Preencha todos os campos.";
    }
    if (senha.value.length < TAMANHO_MINIMO_SENHA) {
        return `A senha precisa ter pelo menos ${TAMANHO_MINIMO_SENHA} caracteres.`;
    }
    if (!senhasCoincidem.value) {
        return "As senhas não são iguais.";
    }
    if (!aceitouTermos.value) {
        return "Aceite os Termos de uso e a Política de privacidade para continuar.";
    }
    return "";
};

const criarConta = async () => {
    erro.value = validarFormulario();
    if (erro.value) return;

    enviando.value = true;
    try {
        await cadastrar(nomeUsuario.value, email.value, senha.value);
        router.push("/login");
    }
    catch (e) {
        erro.value = e.message;
    }
    finally {
        enviando.value = false;
    }
};
</script>

<template>
    <LayoutAutenticacao
        titulo-painel="Toda boa história tem um começo."
        titulo="Comece sua história."
        subtitulo="Crie sua conta grátis e dê um lugar aos seus livros."
    >
        <form
            class="flex flex-col gap-4"
            novalidate
            @submit.prevent="criarConta"
        >
            <XInput
                v-model="nomeUsuario"
                label="Nome"
                name="nomeUsuario"
                placeholder="Como quer ser chamada?"
                autocomplete="username"
            />

            <div class="flex flex-col gap-1">
                <XInput
                    v-model="email"
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    autocomplete="email"
                />
                <span class="text-xs text-light-brown">Vamos usar este e-mail para acessar sua estante.</span>
            </div>

            <div class="flex flex-col gap-1">
                <XInput
                    v-model="senha"
                    label="Senha"
                    name="senha"
                    type="password"
                    placeholder="Crie uma senha"
                    autocomplete="new-password"
                />
                <ForcaSenha :senha="senha" />
            </div>

            <div class="flex flex-col gap-1">
                <XInput
                    v-model="confirmarSenha"
                    label="Confirmar senha"
                    name="confirmarSenha"
                    type="password"
                    placeholder="Repita a senha"
                    autocomplete="new-password"
                />
                <span
                    v-if="confirmarSenha"
                    class="text-xs"
                    :class="senhasCoincidem ? 'text-light-brown' : 'text-error'"
                    aria-live="polite"
                >
                    {{ senhasCoincidem ? "As senhas coincidem." : "As senhas não coincidem." }}
                </span>
            </div>

            <XInput
                v-model="aceitouTermos"
                label="Li e aceito os Termos de uso e a Política de privacidade."
                name="aceitouTermos"
                type="checkbox"
            />

            <p
                v-if="erro"
                class="text-sm text-error"
                role="alert"
            >
                {{ erro }}
            </p>

            <XButton
                :text="enviando ? 'Criando conta...' : 'Criar conta grátis'"
                type="submit"
                :disabled="enviando"
            />

            <p class="flex items-start gap-3 text-xs text-light-brown">
                <IconeCadeado class="mt-0.5 shrink-0" />
                Sua estante e suas notas são pessoais. Sem pressa, sem cobranças.
            </p>
        </form>

        <template #alternativa>
            <p class="text-center text-sm text-light-brown">
                Já tem uma conta?
                <RouterLink
                    to="/login"
                    class="ml-1 font-semibold text-brown"
                >
                    Entrar
                </RouterLink>
            </p>
        </template>
    </LayoutAutenticacao>
</template>
