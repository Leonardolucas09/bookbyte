import { createRouter, createWebHistory } from "vue-router";
import LayoutPrincipal from "../layouts/LayoutPrincipal.vue";
import Home from "../Pages/Home.vue";
import Estante from "../Pages/Estante.vue";
import NotasLeitura from "../Pages/NotasLeitura.vue";
import Configuracoes from "../Pages/Configuracoes.vue";
import Login from "../Pages/Login.vue";
import RecuperarSenha from "../Pages/RecuperarSenha.vue";

const routes = [
    {
        path: "/",
        component: LayoutPrincipal,
        children: [
            { path: "", name: "home", component: Home },
            { path: "estante", name: "estante", component: Estante },
            { path: "notas", name: "notas", component: NotasLeitura },
            { path: "configuracoes", name: "configuracoes", component: Configuracoes },
        ],
    },
    { path: "/login", name: "login", component: Login },
    { path: "/recuperar-senha", name: "recuperarSenha", component: RecuperarSenha },
    { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
