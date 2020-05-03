class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        //this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.spritesheet("screen", "./assets/spritesheet.png", {frameWidth: 502, frameHeight: 502});
        
    }

    create(){
        
        this.titleScreen = this.add.sprite(this, 0, 0, "screen").setOrigin(0, 0)
        this.anims.create({
            key: "title",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("screen", {start: 0, end: 2, first: 0}),
            frameRate:8
        });
        this.titleScreen.play("title")

        //score display
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "26px",
            backgroundColor: "#F3B141",
            color: "#123456",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, "Temp", menuConfig).setOrigin(0.5);
        
        
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        
        let playButton = this.add.text(centerX, centerY, "Play", menuConfig).setOrigin(0.5);
        playButton.setInteractive();
        playButton.on("pointerup", () =>{
            this.scene.start("playScene");
        })


        this.add.text(20, 20, "Temp Menu");
        //this.scene.start("playScene");

        //define keys
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        /*if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer1: 60000,
            gameTimer2: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }*/
      }
}