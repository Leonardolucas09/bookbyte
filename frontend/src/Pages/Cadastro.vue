<script setup>
const emit = defineEmits(['navigate']);

const goToHome = () => {
  emit('navigate', 'home');
}

const goToLogin = () => {
  emit('navigate', 'login');
}
</script>

<template>
  <div class="cardTelaCadastro">
    <div class="containerTelaCadastro">

      <div class="form-boxTelaCadastro">

        <div class="text-titleTelaCadastro">
          Cadastrar
        </div>

        <div class="formularioTelaCadastro">

          <input
            type="text"
            placeholder="Digite seu nome completo"
            class="inputTelaCadastro"
          />

          <input
            type="text"
            placeholder="Digite um nome de usuário"
            class="inputTelaCadastro"
          />

          <input
            type="email"
            placeholder="Digite seu e-mail"
            class="inputTelaCadastro"
          />

          <input
            type="date"
            placeholder="Data de nascimento"
            class="inputTelaCadastro"
          />

          <input
            type="tel"
            placeholder="(00) 00000-0000"
            class="inputTelaCadastro"
          />

          <input
            type="password"
            placeholder="Crie uma senha"
            class="inputTelaCadastro"
          />

          <input
            type="password"
            placeholder="Confirme sua senha"
            class="inputTelaCadastro"
          />

          <button
            class="btnCadastro"
            @click="goToHome"
          >
            Cadastrar
          </button>

          <div class="login-boxCadastro">
            <a
              href="#"
              class="linkCadastro"
              @click.prevent="goToLogin"
            >
              Já possui uma conta? Entrar
            </a>
          </div>

        </div>

      </div>

      <p class="footer-textCadastro">
        @2026 BugOps
      </p>

    </div>
  </div>
</template>

<style scoped>

.cardTelaCadastro{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at top, #0b0b0b,#000000);
  font-family: 'Poppins', sans-serif;
}

.containerTelaCadastro{
  width: 360px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 0 8px rgba(0,255,170,0.08),
              0 0 20px rgba(0,255,170,0.04);
  position: relative;
}

.form-boxTelaCadastro{
  width: 300px;
  background: #111;
  border-radius: 20px;
  box-shadow: 0 0 12px rgba(39,239,178,0.08),
              0 0 40px rgba(0,255,170,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

.text-titleTelaCadastro{
  color:#d9d9d9;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 25px;
}

.formularioTelaCadastro{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
}

.inputTelaCadastro{
  width: 240px;
  height: 45px;
  border-radius: 12px;
  border: none;
  padding: 0 15px;
  font-size: 15px;
  background-color: #1a1a1a;
  color: #fff;
}

.inputTelaCadastro::placeholder{
  color: #a1a1a1;
}

.inputTelaCadastro:focus{
  outline: none;
  box-shadow: 0 0 5px rgba(39,239,178,0.5);
}

.btnCadastro{
  width: 240px;
  height: 50px;
  border: none;
  border-radius: 8px;
  background-color: #27efb2;
  color: #000;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: .3s;
}

.btnCadastro:hover{
  box-shadow: 0 0 10px rgba(39,239,178,0.5);
  transform: scale(1.03);
}

.login-boxCadastro{
  margin-top: 5px;
}

.linkCadastro{
  color: #969696;
  font-size: 14px;
  text-decoration: underline;
}

.linkCadastro:hover{
  color: #27efb2;
}

.footer-textCadastro{
  margin-top: 15px;
  font-size: 12px;
  color: #666;
}

</style>