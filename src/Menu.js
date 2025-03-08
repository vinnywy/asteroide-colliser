export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('bgMenu', './Assets/background_Menu.jpg');
        this.load.image('titulo', './Assets/titulo.png');
        this.load.image('botao', './Assets/botao.png'); // Carregando o botão
    }

    create() {
        this.add.image(0, 0, 'bgMenu').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);
        this.add.image(933, 200,'titulo');

        const button = this.add.image(this.scale.width / 2, this.scale.height/1.5, 'botao')
            .setInteractive() // Permite interação com o botão
            .setScale(0.5);

        button.on('pointerdown', () => {
            this.scene.start('Cena2'); // Troca para a Cena2
        });
    }

    update(){

    }
}

