const DinogameRender = () => {

  const iframe = document.querySelector('.dinogame iframe');  
  iframe.srcdoc = `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DinoGame</title>
        <link href="./src/style/navigateur/dinogame.css" rel="stylesheet">
      </head>
      <body>
        <div class="world" data-world>
          <div class="score" data-score>0</div>
          <div class="start-screen" data-start-screen>Toque na tela para começar</div>
          <img src="src/img/ground.png" alt="Ground" class="ground" data-ground>
          <img src="src/img/ground.png" alt="Ground" class="ground" data-ground>
          <img src="src/img/dino-stationary.png" alt="Dino stationary" class="dino" data-dino>
        </div>

        <div class="fake-error">
          <h1>Sem acesso à internet</h1>
          <p>Aqui estão algumas dicas :<br>
          <ul>
            <li>Verifique os cabos de rede, modem e roteador.</li>
            <li>Reconecte-se à rede Wi-Fi</li>
          </ul>
          <p>ERR_INTERNET_DISCONNECTED</p>
        </div>

        <script src="./src/js/navigateur/dinogame/dinogame.js" type="module"></script>
      </body>
    </html>
  `;
}

export default DinogameRender;