import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { aplicarAparenciaSalva } from "./utils/aparencia.js";

aplicarAparenciaSalva();

createApp(App).use(router).mount("#app");
