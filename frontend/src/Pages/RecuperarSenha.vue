<script setup>
import { ref } from "vue";

const emit = defineEmits(['navigate']);

const linkEnviado = ref(false);

const enviarLink = () => {
  setTimeout(() => {
    linkEnviado.value = true;
  }, 1000);
}

const goToLogin = () => {
  emit('navigate', 'login');
}
</script>

<template>
  <div class="cardTelaRecuperarSenha">
    <div class="containerTelaRecuperarSenha">

      <div class="form-boxTelaRecuperarSenha">

        <div class="text-titleTelaRecuperarSenha">
          Recuperar Senha
        </div>

        <p class="textoRecuperarSenha">
          Digite seu e-mail cadastrado para receber um link de recuperação.
        </p>

        <div class="formularioTelaRecuperarSenha">

          <input
            type="email"
            placeholder="Digite seu e-mail"
            class="inputTelaRecuperarSenha"
          />

          <button
            class="btnRecuperarSenha"
            @click="enviarLink"
          >
            Enviar link de recuperação
          </button>

          <p
            v-if="linkEnviado"
            class="mensagemSucesso"
          >
            Link de recuperação enviado para seu e-mail.
          </p>

          <a
            href="#"
            class="voltarLogin"
            @click.prevent="goToLogin"
          >
            Voltar para login
          </a>

        </div>

      </div>

      <p class="footer-textRecuperarSenha">
        @2026 BugOps
      </p>

    </div>
  </div>
</template>

<style scoped>

.cardTelaRecuperarSenha{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at top, #0b0b0b,#000000);
  font-family: 'Poppins', sans-serif;
}

.containerTelaRecuperarSenha{
  width: 320px;
  height: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow:
    0 0 8px rgba(0,255,170,0.08),
    0 0 20px rgba(0,255,170,0.04);
  padding: 20px 0;
}

.form-boxTelaRecuperarSenha{
  width: 260px;
  height: 450px;
  min-height: 350px;
  background: #111;
  border-radius: 20px;
  box-shadow:
    0 0 12px rgba(39,239,178,0.08),
    0 0 40px rgba(0,255,170,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  padding: 35px 20px;
}

.text-titleTelaRecuperarSenha{
  color:#d9d9d9;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

.textoRecuperarSenha{
  color: #a1a1a1;
  text-align: center;
  font-size: 14px;
  margin-bottom: 25px;
  line-height: 20px;
}

.formularioTelaRecuperarSenha{
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: center;
  gap: 18px;
  width: 100%;
}

.inputTelaRecuperarSenha{
  width: 240px;
  height: 45px;
  border-radius: 12px;
  border: none;
  padding: 0 15px;
  font-size: 15px;
  background-color: #1a1a1a;
  color: #fff;
}

.inputTelaRecuperarSenha::placeholder{
  color: #a1a1a1;
}

.inputTelaRecuperarSenha:focus{
  outline: none;
  box-shadow: 0 0 5px rgba(39,239,178,0.5);
}

.btnRecuperarSenha{
  width: 240px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #27efb2;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: .3s;
}

.btnRecuperarSenha:hover{
  transform: scale(1.03);
  box-shadow: 0 0 10px rgba(39,239,178,0.5);
}

.voltarLogin{
  color: #969696;
  font-size: 14px;
  text-decoration: underline;
}

.voltarLogin:hover{
  color: #27efb2;
}

.footer-textRecuperarSenha{
  margin-top: 15px;
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  color: #666;
}

.mensagemSucesso{
  color: #27efb2;
  font-size: 14px;
  margin-top: 10px;
}

</style>