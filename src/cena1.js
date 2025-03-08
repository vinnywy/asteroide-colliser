export class Cena1 extends Phaser.Scene {
    constructor() {
        super('Cena1');
        this.nave = null;
        this.teclado = null;
        this.velocidade = 700; 
        this.velocidadeRotacao = 5; 
        this.fogo = null;
        this.plataformas = [];
    }

    preload() {
        this.load.image('bg', './Assets/background.png');
        this.load.image('player', './Assets/nave.png');
        this.load.image('turbo', './Assets/fogo.png');
        this.load.image('asteroide', './Assets/asteroide.png');
        this.load.image('meteorito', './Assets/meteorito.png');
    }

    create() {
        this.tempoInicio = this.time.now;
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);

        // Adição do turbo da nave como sprite e sua posição inicial
        this.fogo = this.add.sprite(0, 0, 'turbo').setScale(0.05);
        this.fogo.setVisible(false); // Deixa o turbo invisível no início

        this.nave = this.physics.add.sprite(1000, 500, 'player').setScale(0.25);
        this.nave.setCollideWorldBounds(true);

        this.teclado = this.input.keyboard.createCursorKeys();

        // Cria grupo de meteoritos
        this.cinturao = this.physics.add.group();

        // Criando o evento para gerar meteoritos
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                let yAleatorio = Phaser.Math.Between(50, 837); // A flecha cai de uma coordenada Y aleatória da lateral esquerda da tela
                let meteorito = this.cinturao.create(0, yAleatorio, "meteorito"); // Meteorito começa na posição X=0 (esquerda)
                meteorito.setScale(1.5);
                meteorito.setVelocityX(300); // Meteoritos se movem para a direita
                meteorito.body.setAllowGravity(false); // Desabilita a gravidade nos meteoritos

                // Corrigido para referência correta
                this.physics.add.overlap(this.nave, meteorito, () => {
                    if (this.morreu) return; // jogador ja morreu
                    console.log('O jogador morreu');

                    this.morreu = true;

                    var tempoEmSegundos = Math.floor((this.time.now - this.tempoInicio) / 1000)
                    this.add.text(1866 / 2, 837 / 2 - 40, "Você morreu!", { fill: "white", fontSize: "40px" }).setOrigin(0.5); // Adiciona o texto centralizado na tela
                    this.add.text(1866 / 2, 837 / 2 - 10, "Tempo vivo: " + tempoEmSegundos + "s", { fill: "white", fontSize: "40px" }).setOrigin(0.5); // Adiciona o texto centralizado na tela
                });
            },
            loop: true,
        });

        this.textoTempoVivo = this.add.text(1610, 10, "Tempo vivo: 0s", { fill: "white", fontSize: "25px" })
    }

    ativarTurbo() {
        this.fogo.setVisible(true);
        // A posição do fogo é ajustada em relação à nave
        this.fogo.setPosition(this.nave.x + 45, this.nave.y + 10); // Ajuste de posição (atrás da nave)
        this.fogo.rotation = this.nave.rotation; // Faz com que o fogo siga a rotação da nave
    }

    semTurbo() {
        this.fogo.setVisible(false);
    }

    update() {

        if (this.morreu) {
            this.nave.setVelocity(0, 0)
            this.semTurbo();
            return; // se o jogador morreu, nao deixa se movimentar
        }

        this.textoTempoVivo.setText("Tempo vivo: " + Math.floor((this.time.now - this.tempoInicio) / 1000) + "s")

        // Rotação da nave ao pressionar as setas esquerda/direita
        if (this.teclado.left.isDown) {
            this.nave.angle -= this.velocidadeRotacao;
        } else if (this.teclado.right.isDown) {
            this.nave.angle += this.velocidadeRotacao;
        }

        // Calcula a direção da nave baseado no ângulo atual
        let radianos = Phaser.Math.DegToRad(this.nave.angle);
        let direcaoX = Math.cos(radianos);
        let direcaoY = Math.sin(radianos);

        // Movimento para frente ou para trás
        if (this.teclado.up.isDown) {
            this.nave.setVelocity(direcaoX * this.velocidade, direcaoY * this.velocidade);
            this.ativarTurbo();
        } else if (this.teclado.down.isDown) {
            this.nave.setVelocity(-direcaoX * this.velocidade, -direcaoY * this.velocidade);
            this.ativarTurbo();
        } else {
            this.nave.setVelocity(0, 0);
            this.semTurbo();
        }
    }
}
