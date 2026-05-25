<template>
  <div class="cardTelaIntro">
    <div class="containerTelaIntro">
   <svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <path d="M85 65C170 65 205 90 255 165L255 430C210 380 165 350 85 345Z"
    fill="#27efb2"/>
  <path d="M427 65C342 65 307 90 257 165L257 430C302 380 347 350 427 345Z"
    fill="#27efb2"/>
  <path d="M45 95L45 395C120 400 180 420 230 470" stroke="#27efb2" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20 120L20 425C105 430 175 450 225 490" stroke="#27efb2" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M467 95L467 395C392 400 332 420 282 470" stroke="#27efb2" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M492 120L492 425C407 430 337 450 287 490" stroke="#27efb2" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
</svg>
  
    <h1 class="text-titleTelaIntro">Book<span>Byte</span></h1>
    <div class="linhaTelaIntro"></div>
    <p class="text-TelaIntro">sua jornada de leitura<br> começa aqui</p>
    <div class="botoesTelaIntro">
    <button class="btn-cadastrarse" id="btn-cadastrarse">

    <svg
      class="icone-cadastro"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >

    <circle
      cx="10"
      cy="8"
      r="4"
      stroke="currentColor"
      stroke-width="2"
    />

    <path
      d="M4 20C4 16.6863 6.68629 14 10 14C13.3137 14 16 16.6863 16 20"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />

    <path
      d="M19 8V14"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />

    <path
      d="M16 11H22"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />

  </svg>

  Cadastrar-se

</button>
      <button class="btn-entrar" id="btn-entrar">
      <svg
      class="icone-login"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >

      <path
        d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <path
        d="M10 17L15 12L10 7"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 12H21"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
      </svg>
        Entrar
      </button>
    </div>
    </div>
    <p class="footer-textTelaIntro">@2026 BugOps</p>
  </div>
</template>

<style>
.cardTelaIntro{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  
  width: 100%;

  background: radial-gradient(circle at top, #0b0b0b, #000000);
  font-family: 'Poppins', sans-serif;
}
.containerTelaIntro {
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
.logoTelaIntro{
  align-items: center;
  justify-content: center;
  height: 75px;
  width: 95px;

}
/*oi*/

.text-titleTelaIntro {
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
.text-titleTelaIntro span{
  color:#27efb2;
}
.linhaTelaIntro{
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
.text-TelaIntro {
  color: #b8b8b8;
  width:237px;
  line-height: 32px;
  text-align: center;
  font-family:  'Inter', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 100%;
  letter-spacing: 0px;
  margin-top: 25px;
}
.botoesTelaIntro{
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
.icone-cadastro{
  width:25px;
  height:25px;
  color:black;
  transition:0.3s;
}

.btn-cadastrarse:hover .icone-cadastro, .btn-entrar:hover .icone-login{
  color:#27efb2;
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
.icone-login{
  width:20px;
  height:20px;
  color:white;
  transition:0.3s;
}
.btn-entrar:hover{
  background:#151515;
  border-color: #27efb2;
  color:#27efb2;
}

.btn-cadastrarse:hover, .btn-entrar:hover {
  font-size: 20px;
  font-weight: bold;
  box-shadow:
    0 0 15px rgba(39,239,178,0.5);
}
.footer-textTelaIntro{
  position:absolute;
  justify-content: center;
  align-items: center;
  bottom:30px;
  color:#666;
  font-size: 14px;
  z-index: 2;
}
</style>