// Importa classes 
import { Cena1 } from "./src/cena1.js"
import { Menu } from "./src/Menu.js"

/*Global variables definition*/
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT
    },
    autoCenter: Phaser.Scale.CENTER,
    width: 1866, //largura da tela do jogo
    height: 837, //altura da tela do jogo
    backgroundColor: '#39addd',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    parent: "game",
    dom:{
       createContainer: true,
    },
    scene: [Menu, Cena1]
};

export default new Phaser.Game(config);