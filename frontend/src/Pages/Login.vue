<template>
  <!-- fundo da tela inteira -->
  <div class="card">
    <!-- quadrado do login -->  
    <div class="container">
      <!-- quadrado do formulario -->
        <div class="form-box">
        <!-- texto de entrar (titulo) -->    
          <div class="text-title">Entrar</div>
          <!-- parte inteira do formulario -->
            <div class="formulario">
            <!-- campo emeil e senha -->
            <input type="email" placeholder="Digite seu e-mail" class="input-email"/>
            <input type="password" placeholder="Digite sua senha" class="input-senha"/>
              <!-- quadrado p lembrar d mim -->
              <div class="lembrarme">
              <label class="checkbox-container">
              <input type="checkbox" />Lembrar-me</label>
              </div>
                <!-- botão entrar -->
                <button class="btn-entrar">Entrar</button>
                  <!-- botao esqueci minha senha -->
                  <div class="senha-box">
                  <a href="#" class="esquecisenha">Esqueci minha senha</a>
                  </div>
                </div>
            </div>
          </div>
    <p class="footer-text">@2026 BugOps</p>
  </div>
</template>

<style>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.card{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  
  width: 100%;
  background: radial-gradient(circle at top, #0b0b0b,#000000);
  font-family: 'Poppins', sans-serif;
}


.container {
  height: 640px;
  width: 320px;
  padding-top: 65px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 0 8px rgba(0, 255, 170, 0.08), 0 0 20px rgba(0, 255, 170, 0.04);
  position: relative;
  overflow: hidden;
}
.form-box{
  width: 260px;
  height: 430px;
  background: #111;
  border-radius: 20px;
  box-shadow: 0 0 12px rgba(39,239,178,0.08), 0 0 40px rgba(0, 255, 170, 0.08);
  display: flex;
  padding: 40px 20px;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}

.text-title{
  align-items: center;
  color:#d9d9d9;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}

.input-email, .input-senha {
  width: 230px;
  height: 50px;
  border-radius: 14px;
  border: none;
  padding: 0 15px;
  font-size: 16px;
  background-color: #1a1a1a;
  color: #fff;

}
.input-email::placeholder, .input-senha::placeholder {
  color: #a1a1a1;
}
.input-email:focus, .input-senha:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(39,239,178,0.5);
}
.lembrarme {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin-top: 15px;
}
.checkbox-container {
  display: flex;
  align-items: center;
  color: #c5c5c5;
  font-size: 14px;
  margin-left:10px;
}

.checkbox-container input {
  accent-color: #27efb2;
  margin-right: 8px;
  cursor: pointer;
}

.checkbox-container input:checked{
  box-shadow: 0 0 5px #27efb2, 0 0 10px #27efb2;

}

.esquecisenha {
  color: #969696;
  font-size: 14px;
  text-decoration: none;
  text-decoration: underline
}
.esquecisenha:hover {
  text-decoration: underline;
  color: #27efb2;
}

.btn-entrar{
  width: 230px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #27efb2;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn-entrar:hover{
  background-color: #27efb2;
  box-shadow: 0 0 10px rgba(39,239,178,0.5);
  transform: scale(1.03);
}

.formulario{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-top:15px;
} 

.footer-text{
  position: absolute;
  bottom: 20px;
  font-size: 12px;
  height: 20px;
  color: #666;
}

</style>