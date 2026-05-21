<template>
  <div class="card">
    <div class="container">
    <img width=133px height=119px src="./assets/logoLivroAberto.png" alt="Logo" />
    <h1 class="text-title">Book<span>Byte</span></h1>
    <div class="linha"></div>
    <p class="text-intro">sua jornada de leitura<br/> começa aqui</p>
      <div class="botoes">
      <button class="btn-cadastrarse" id="btn-cadastrarse"><img src="./assets/cadastroIconePreto.png"/>Cadastrar-se</button>
      <button class="btn-entrar" id="btn-entrar"><img src="./assets/loginBranco.png"/>Entrar</button></div>
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

  background-color: radial-gradient(circle at top, #0b0b0b,#000000);
  font-family: 'Poppins', sans-serif;
}
.container {
  height: 640px;
  width: 320px;
  padding-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow:
    0 0 10px rgba(0, 255, 170, 0.15),
    0 0 40px rgba(0, 255, 170, 0.08);

  position: relative;
  overflow: hidden;

}
img{
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 95px;

}

.text-title {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:20px;
  font-size:36px;
  font-weight: 700;
  letter-spacing: -1px;
  font-family: 'Poppins', sans-serif;
  z-index:2;

}
.text-title span{
  color:#27efb2;
}
.linha{
  width:60px;
  height: 1px;
  background-color: #27efb2;
  box-shadow:
    0 0 5px rgba(0, 255, 170, 0.15),
    0 0 5px rgba(0, 255, 170, 0.08);
  border-radius: 999px;
  margin-top: 18px;
  z-index:2;
}
.text-intro {
  color: #b8b8b8;
  width:237px;
  line-height: 32px;
  text-align: center;
  font-family:  'Inter', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;
  letter-spacing: 0%;
  margin-top: 25px;
}
.botoes{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 22px;
  width: 100%;
  margin-top:140px;
}
.btn-cadastrarse, .btn-entrar {
  width: 250px;
  height: 65px;
  border-radius: 18px;
  transition: 0.3s;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
}
.btn-cadastrarse{
  display: flex;
  justify-content: center;
  align-items: center;
  gap:12px;
  background-color: #27efb2;
  color:#000000;
  font-weight: bold;
  box-shadow:
    0 0 15px rgba(39,239,178,0.5);
}
.btn-cadastrarse img{
  width: 25px;
  height: 25px;
  opacity: 0.85;
}
.btn-cadastrarse:hover img{
  content: url('./assets/cadastroIconePadrao.png');
  width: 25px;
  height: 25px;
}
.btn-cadastrarse:hover{
  transform:scale(1.03);
  background-color: #000000;
  color:#27efb2;
}
.btn-entrar{
  background-color: #0a0a0a;
  border:1px solid #2d2d2d;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
.btn-entrar img{
  width: 20px;
  height: 20px;
  opacity: 0.85;
}
.btn-entrar:hover{
  background:#151515;
  border-color: #27efb2;
  color:#27efb2;
}
.btn-entrar:hover img{
  content: url('./assets/loginCorPadrao.png');
  width: 20px;
  height: 20px;
}

.btn-cadastrarse:hover, .btn-entrar:hover {
  font-size: 20px;
  font-weight: bold;
  box-shadow:
    0 0 15px rgba(39,239,178,0.5);
}
.footer-text{
  position:absolute;
  justify-content: center;
  align-items: center;
  bottom:30px;
  color:#666;
  font-size: 14px;
  z-index: 2;
}
</style>