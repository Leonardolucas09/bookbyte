<script setup>
import IconeCadeado from "../components/icons/IconeCadeado.vue";
import XButton from "../components/X-Button.vue";
import XInput from "../components/X-Input.vue";
import LayoutAutenticacao from "../layouts/LayoutAutenticacao.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { entrar } from "../services/api.js";

const router = useRouter();

const email = ref("");
const password = ref("");
const checkbox = ref(true);
const erro = ref("");

const fazerLogin = async () => {
    erro.value = "";
    try {
        const dados = await entrar(email.value, password.value);
        localStorage.setItem("token", dados.token);
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));
        router.push("/estante");
    }
    catch (e) {
        erro.value = e.message;
    }
};

</script>

<template>
    <LayoutAutenticacao
        titulo-painel="Suas histórias esperam por você."
        titulo="Bom ter você de volta."
        subtitulo="Entre para continuar suas histórias de onde parou."
    >
        <form
            class="flex flex-col gap-4"
            @submit.prevent="fazerLogin"
        >
            <XInput
                v-model="email"
                label="E-mail"
                name="email"
                placeholder="Digite seu e-mail ou nome de usuário"
                autocomplete="username"
            />
            <XInput
                v-model="password"
                label="Senha"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                autocomplete="current-password"
            />

            <div class="flex flex-col items-start gap-3">
                <XInput
                    v-model="checkbox"
                    label="Manter conectado"
                    name="manterConectado"
                    type="checkbox"
                />
                <RouterLink
                    to="/recuperar-senha"
                    class="text-sm text-brown"
                >
                    Esqueci minha senha
                </RouterLink>
            </div>

            <p
                v-if="erro"
                class="text-sm text-error"
                role="alert"
            >
                {{ erro }}
            </p>

            <XButton
                text="Entrar"
                type="submit"
            />

            <p class="flex items-start gap-3 text-xs text-light-brown">
                <IconeCadeado class="mt-0.5 shrink-0" />
                Seus livros e notas continuam no seu espaço pessoal.
            </p>
        </form>

        <template #alternativa>
            <div class="flex flex-col gap-3">
                <span class="text-sm text-olive-900">Ainda não tem uma conta?</span>
                <RouterLink
                    to="/cadastro"
                    class="flex w-full justify-center rounded-md border border-line bg-input px-4 py-2 font-semibold text-brown transition-opacity hover:opacity-90"
                >
                    Criar conta grátis
                </RouterLink>
            </div>
        </template>
    </LayoutAutenticacao>
</template>
