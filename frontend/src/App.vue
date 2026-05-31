<script setup>
  import { ref, computed } from "vue";
  import Introducao from "./Pages/Introducao.vue";
  import Login from "./Pages/Login.vue";
  import Home from "./Pages/Home.vue";
  import PerfilMenu from "./Pages/Perfilmenu.vue";
  import Estante from "./Pages/Estante.vue";
  import MinhaLista from "./Pages/MinhaLista.vue";

  const routes = {
    "": Home,
    "login": Login,
    "introducao": Introducao,
    "perfilMenu": PerfilMenu,
    "estante": Estante,
    "lista": MinhaLista,
  }

  const currentRoute = ref("");

  const navigate = (path) => {
    currentRoute.value = path;
  }

  const currentView = computed(() => {
    return routes[currentRoute.value] || Home;
  });
</script>

<template>
  <component :is="currentView" @navigate="navigate" />
</template>
