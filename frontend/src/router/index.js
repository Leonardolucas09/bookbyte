import { createRouter, createWebHistory } from "vue-router";
import LayoutPrincipal from "../layouts/LayoutPrincipal.vue";
import Estante from "../Pages/Estante.vue";
import Descobrir from "../Pages/Descobrir.vue";
import NotasLeitura from "../Pages/NotasLeitura.vue";
import Configuracoes from "../Pages/Configuracoes.vue";
import Login from "../Pages/Login.vue";
import Cadastro from "../Pages/Cadastro.vue";
import RecuperarSenha from "../Pages/RecuperarSenha.vue";

const routes = [
    {
        path: "/",
        component: LayoutPrincipal,
        children: [
            { path: "", redirect: "/estante" },
            { path: "estante", name: "estante", component: Estante },
            { path: "descobrir", name: "descobrir", component: Descobrir },
            { path: "notas", name: "notas", component: NotasLeitura },
            { path: "configuracoes", name: "configuracoes", component: Configuracoes },
        ],
    },
    { path: "/login", name: "login", component: Login },
    { path: "/cadastro", name: "cadastro", component: Cadastro },
    { path: "/recuperar-senha", name: "recuperarSenha", component: RecuperarSenha },
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Telas que podem ser abertas sem estar logado
const telasPublicas = ["login", "cadastro", "recuperarSenha"];

// Antes de abrir qualquer tela: se não está logado, manda para o login
router.beforeEach((destino) => {
    const estaLogado = localStorage.getItem("token");
    if (!estaLogado && !telasPublicas.includes(destino.name)) {
        return "/login";
    }
});

export default router;
