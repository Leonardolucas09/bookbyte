
<script setup>
  import { ref, computed } from "vue";
  // import Introducao from "./Pages/Introducao.vue";
  import Login from "./Pages/Login.vue";
  // import Home from "./Pages/Home.vue";
  // import Cadastro from "./Pages/Cadastro.vue";
  import RecuperarSenha from "./Pages/RecuperarSenha.vue";

  const routes = {
    // "": Home,
    "login": Login,
    // "introducao": Introducao,
    // "cadastro": Cadastro,
    "recuperarSenha": RecuperarSenha
  }

  const currentRoute = ref("login");

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

<style>
  .lora {
    font-family: "Lora", serif;
  }

  .bg-brown {
    background-color: #785A3E;
  }

  .bg-cream {
    background-color: #F7EDD7;
  }

  .text-brown {
    color: #785A3E;
  }

  .text-light-brown {
    color: #777168;
  }

  .bg-input {
    background-color: #FFFEFA;
  }

  .stroke-input {
    border: 1px solid #785A3E;
  }
</style>