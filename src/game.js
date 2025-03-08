import { Cena1 } from './cena1.js'; // Supondo que Cena1 esteja em outro arquivo
import { Cena2 } from './cena2.js'; // Adicionando a importação da Cena2

const config = {
    type: Phaser.AUTO, // Seleciona automaticamente entre WebGL e Canvas
    width: window.innerWidth,                  // Resolução base fixa: largura
    height: window.innerHeight,                 // Resolução base fixa: altura
    scale: {
      mode: Phaser.Scale.FIT,    // Ajusta o jogo para caber na janela mantendo a proporção
      autoCenter: Phaser.Scale.CENTER_BOTH  // Centraliza o canvas na tela
    },
    physics: {
      default: "arcade", // Usando o sistema de física arcade
      arcade: {
        gravity: { y: 300 },  // Definindo a gravidade no eixo Y
        debug: true // Ativa o modo de depuração da física
      }
    },
    scene: [Cena1, Cena2] // Definindo as cenas
};

export default new Phaser.Game(config);