<script setup>
import { computed, onMounted, ref, watch } from "vue";
import CartaoSecao from "../components/CartaoSecao.vue";
import IconeConfirmar from "../components/icons/IconeConfirmar.vue";
import IconeSair from "../components/icons/IconeSair.vue";
import IconeSetaDireita from "../components/icons/IconeSetaDireita.vue";
import XButton from "../components/X-Button.vue";
import XInput from "../components/X-Input.vue";
import XSelect from "../components/XSelect.vue";
import XToggle from "../components/XToggle.vue";
import MensagemStatus from "../components/MensagemStatus.vue";
import { useSalvamento } from "../composables/useSalvamento.js";
import { pegarUsuario, sair, salvarPerfil, salvarPreferencias } from "../services/api.js";
import { estante } from "../services/estante.js";
import { aplicarAparencia } from "../utils/aparencia.js";
import { guardarUsuarioLogado, pegarIniciais, pegarUsuarioLogado } from "../utils/usuario.js";

const anoAtual = new Date().getFullYear();

const usuario = ref(pegarUsuarioLogado());
const iniciais = computed(() => pegarIniciais(usuario.value.nomeUsuario));

const nome = ref(usuario.value.nomeUsuario ?? "");
const email = ref(usuario.value.email ?? "");

const unidadeProgresso = ref("paginas");
const metaLivros = ref("20");
const lembreteLeitura = ref(true);
const novidadesEmail = ref(false);

const tema = ref("claro");
const fonteLeitura = ref("lora");
const tamanhoTexto = ref("medio");

const erroCarregamento = ref("");
const perfil = useSalvamento();
const leitura = useSalvamento();
const aparencia = useSalvamento();

onMounted(async () => {
    try {
        const dados = await pegarUsuario();
        usuario.value = dados;
        nome.value = dados.nomeUsuario;
        email.value = dados.email;

        const preferencias = dados.preferencias;
        unidadeProgresso.value = preferencias.unidadeProgresso;
        metaLivros.value = String(preferencias.metaLivros);
        lembreteLeitura.value = preferencias.lembreteLeitura;
        novidadesEmail.value = preferencias.novidadesEmail;
        tema.value = preferencias.tema;
        fonteLeitura.value = preferencias.fonteLeitura;
        tamanhoTexto.value = preferencias.tamanhoTexto;
    }
    catch (e) {
        erroCarregamento.value = e.message;
        return;
    }

    // Criado só depois de carregar, para não salvar os valores que acabaram de vir da API.
    // A aparência não tem botão "Salvar" no layout: salva assim que muda.
    watch([tema, fonteLeitura, tamanhoTexto], () => {
        const escolha = { tema: tema.value, fonteLeitura: fonteLeitura.value, tamanhoTexto: tamanhoTexto.value };
        aplicarAparencia(escolha);
        aparencia.salvar(() => salvarPreferencias(escolha), "Aparência salva.");
    });
});

const salvarDadosPerfil = () => perfil.salvar(async () => {
    const atualizado = await salvarPerfil(nome.value, email.value);
    usuario.value = atualizado;
    guardarUsuarioLogado(atualizado);
}, "Perfil salvo.");

const salvarPreferenciasLeitura = () => leitura.salvar(() => salvarPreferencias({
    unidadeProgresso: unidadeProgresso.value,
    metaLivros: Number(metaLivros.value),
    lembreteLeitura: lembreteLeitura.value,
    novidadesEmail: novidadesEmail.value,
}), "Preferências salvas.");

const livrosLidos = computed(() => estante.value.filter(livro => livro.statusLeitura === "Lido").length);

const OPCOES_PROGRESSO = [
    { valor: "paginas", texto: "Páginas" },
    { valor: "porcentagem", texto: "Porcentagem" },
];

const OPCOES_FONTE = [
    { valor: "lora", texto: "Lora · Serifada" },
    { valor: "inter", texto: "Inter · Sem serifa" },
];

const OPCOES_TAMANHO = [
    { valor: "pequeno", texto: "Pequeno" },
    { valor: "medio", texto: "Médio" },
    { valor: "grande", texto: "Grande" },
];

const TEMAS = [
    { valor: "claro", nome: "Claro" },
    { valor: "sepia", nome: "Sépia" },
    { valor: "escuro", nome: "Escuro" },
];

const LINKS_CONTA = ["Alterar senha", "Exportar livros e notas", "Privacidade e dados"];
</script>

<template>
    <div class="flex flex-col gap-8 p-5 lg:p-10">
        <header class="flex flex-col gap-3">
            <span class="text-sm uppercase text-brown">Seu espaço, {{ usuario.nomeUsuario }}</span>
            <h1 class="lora text-4xl text-ink">
                Configurações
            </h1>
            <p class="text-light-brown">
                Deixe o BookByte do seu jeito. Sua leitura, suas preferências.
            </p>
            <MensagemStatus :erro="erroCarregamento" />
        </header>

        <div class="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] xl:items-start">
            <div class="flex flex-col gap-6">
                <CartaoSecao titulo="Seu perfil">
                    <div class="flex items-center gap-4">
                        <span class="grid size-16 shrink-0 place-items-center rounded-full bg-sand text-xl font-semibold text-brown">
                            {{ iniciais }}
                        </span>
                        <div class="flex flex-col gap-1">
                            <span class="text-ink">{{ usuario.nomeUsuario }}</span>
                            <span class="text-xs text-light-brown">Um capítulo de cada vez.</span>
                            <button
                                type="button"
                                class="text-left text-xs text-brown"
                            >
                                Alterar foto
                            </button>
                        </div>
                    </div>

                    <form
                        class="flex flex-col gap-4"
                        @submit.prevent="salvarDadosPerfil"
                    >
                        <XInput
                            v-model="nome"
                            label="Nome"
                            name="nome"
                            autocomplete="username"
                        />
                        <div class="flex flex-col gap-1">
                            <XInput
                                v-model="email"
                                label="E-mail"
                                name="email"
                                type="email"
                                autocomplete="email"
                            />
                            <span class="text-xs text-light-brown">Usado para acessar sua conta e recuperar sua senha.</span>
                        </div>
                        <XButton
                            type="submit"
                            :disabled="perfil.salvando.value"
                            class="flex w-full items-center justify-center gap-2 font-semibold sm:w-fit"
                        >
                            <IconeConfirmar />
                            {{ perfil.salvando.value ? "Salvando..." : "Salvar perfil" }}
                        </XButton>
                        <MensagemStatus
                            :mensagem="perfil.mensagem.value"
                            :erro="perfil.erro.value"
                        />
                    </form>
                </CartaoSecao>

                <CartaoSecao titulo="Preferências de leitura">
                    <form
                        class="flex flex-col gap-4"
                        @submit.prevent="salvarPreferenciasLeitura"
                    >
                        <XSelect
                            v-model="unidadeProgresso"
                            label="Registrar progresso em"
                            name="unidadeProgresso"
                            :opcoes="OPCOES_PROGRESSO"
                        />
                        <div class="flex flex-col gap-1">
                            <XInput
                                v-model="metaLivros"
                                :label="`Meta de livros em ${anoAtual}`"
                                name="metaLivros"
                                type="number"
                            />
                            <span class="text-xs text-light-brown">
                                Você já leu {{ livrosLidos }} de {{ metaLivros || 0 }} livros. Leia no seu ritmo.
                            </span>
                        </div>
                        <XToggle
                            v-model="lembreteLeitura"
                            label="Lembrete de leitura"
                            descricao="Um convite gentil todos os dias, às 20:00."
                        />
                        <XToggle
                            v-model="novidadesEmail"
                            label="Novidades por e-mail"
                            descricao="Sugestões e novidades do BookByte."
                        />
                        <XButton
                            type="submit"
                            :disabled="leitura.salvando.value"
                            class="w-full font-semibold sm:w-fit"
                            :text="leitura.salvando.value ? 'Salvando...' : 'Salvar preferências'"
                        />
                        <MensagemStatus
                            :mensagem="leitura.mensagem.value"
                            :erro="leitura.erro.value"
                        />
                    </form>
                </CartaoSecao>
            </div>

            <div class="flex flex-col gap-6">
                <CartaoSecao
                    titulo="Aparência"
                    descricao="Escolha um ambiente confortável para suas leituras."
                >
                    <fieldset class="grid grid-cols-3 gap-2">
                        <legend class="sr-only">
                            Tema
                        </legend>
                        <label
                            v-for="opcao in TEMAS"
                            :key="opcao.valor"
                            class="flex cursor-pointer flex-col gap-2 rounded-lg border p-2 text-center text-xs transition-colors has-focus-visible:ring-2 has-focus-visible:ring-brown"
                            :class="tema === opcao.valor ? 'border-brown bg-sand text-brown' : 'border-line text-light-brown'"
                        >
                            <input
                                v-model="tema"
                                type="radio"
                                name="tema"
                                :value="opcao.valor"
                                class="sr-only"
                            >
                            <!-- data-tema faz a miniatura usar as cores do próprio tema, seja qual for o tema da página -->
                            <span
                                :data-tema="opcao.valor"
                                class="flex h-14 flex-col gap-1.5 rounded border border-line bg-input p-2"
                                aria-hidden="true"
                            >
                                <span class="h-0.5 w-1/3 rounded-full bg-brown" />
                                <span class="h-0.5 w-full rounded-full bg-line-strong" />
                                <span class="h-0.5 w-full rounded-full bg-line-strong" />
                            </span>
                            <span class="flex items-center justify-center gap-1">
                                {{ opcao.nome }}
                                <IconeConfirmar
                                    v-if="tema === opcao.valor"
                                    class="size-3"
                                />
                            </span>
                        </label>
                    </fieldset>

                    <XSelect
                        v-model="fonteLeitura"
                        label="Fonte de leitura"
                        name="fonteLeitura"
                        :opcoes="OPCOES_FONTE"
                    />
                    <XSelect
                        v-model="tamanhoTexto"
                        label="Tamanho do texto"
                        name="tamanhoTexto"
                        :opcoes="OPCOES_TAMANHO"
                    />

                    <MensagemStatus
                        :mensagem="aparencia.mensagem.value"
                        :erro="aparencia.erro.value"
                    />

                    <p class="rounded-lg bg-paper p-4 font-leitura text-lg text-ink">
                        Toda página é um novo lugar. Reserve um tempo para uma boa história.
                    </p>
                </CartaoSecao>

                <CartaoSecao
                    titulo="Sua conta"
                    descricao="Seus livros e notas ficam vinculados a este e-mail."
                >
                    <ul class="flex flex-col">
                        <li
                            v-for="link in LINKS_CONTA"
                            :key="link"
                        >
                            <button
                                type="button"
                                class="flex w-full items-center justify-between border-b border-line py-4 text-sm text-brown"
                            >
                                {{ link }}
                                <IconeSetaDireita class="text-light-brown" />
                            </button>
                        </li>
                    </ul>

                    <XButton
                        color="var(--tema-input)"
                        text-color="var(--tema-brown)"
                        class="flex items-center justify-center gap-2 border border-line font-semibold"
                        @click="sair"
                    >
                        <IconeSair />
                        Sair da conta
                    </XButton>

                    <div class="flex flex-col gap-3">
                        <button
                            type="button"
                            class="text-left text-sm text-error"
                        >
                            Excluir minha conta
                        </button>
                        <span class="text-xs text-light-brown">A exclusão remove seus livros e notas de forma permanente.</span>
                    </div>
                </CartaoSecao>
            </div>
        </div>

        <footer class="text-xs text-light-brown">
            BookByte · Sua leitura, no seu ritmo.
        </footer>
    </div>
</template>
