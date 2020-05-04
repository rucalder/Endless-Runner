class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        //this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.spritesheet("screen", "./assets/finalMenu.png", {frameWidth: 642, frameHeight: 482});
        
    }

    create(){
        this.titleScreen = this.add.sprite(this, 0, 0, "screen").setOrigin(0, 0)
        this.anims.create({
            key: "title",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("screen", {start: 0, end: 3, first: 0}),
            frameRate:8
        });
        this.titleScreen.play("title")

        //score display
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "26px",
            backgroundColor: "#8B008B",
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

        //menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#FFFFFF";
        
        /*let playButton = this.add.text(centerX, centerY, "Play", menuConfig).setOrigin(0.5);
        playButton.setInteractive();
        playButton.on("pointerup", () =>{
            this.scene.start("playScene");
        })*/

        this.add.text(centerX, 460, 'Use arrow keys to collect souls', menuConfig).setOrigin(0.5);

        //define keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
          // easy mode
          this.scene.start("playScene")
        }
      }
}