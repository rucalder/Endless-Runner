class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.spritesheet("bone", "./assets/bone sprite.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("skull", "./assets/skull sprite.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("soul", "./assets/soul sprite.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("charon", "./assets/CHARON SPRITE.png", {frameWidth: 32, frameHeight: 32})
    }

    create(){
        this.gameOver = false

        // Borders
        this.add.rectangle(0, 0, 64, 500, 0xF5F5DC).setOrigin(0, 0);
        this.add.rectangle(576, 0, 64, 500, 0xF5F5DC).setOrigin(0, 0);
        this.add.rectangle(64, 0, 512, 500, 0x256d7b).setOrigin(0, 0);
        //this.temp = this.add.rectangle(320, 5, 16, 25, 0xFFFFFF).setOrigin(0, 0);

        this.p1Boat = new Boat(this, 320, 5, "charon").setOrigin(0, 0)
        //const boat = this.add.sprite(200, 100, "CHARON SPRITE", 0)


        // Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // Player animation
        this.anims.create({
            key: "move",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("charon", {start: 0, end: 6 , first: 0}),
            frameRate:8
        });
        this.p1Boat.play("move")

        //Phaser.Physics.Arcade.enable(this.p1Boat);
        this.p1Boat.enableBody = true;
        this.p1Boat.onCollide = true;
        

        // Soul Animation
        this.anims.create({
            key: "soul",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("soul", {start: 0, end: 2, first: 0}),
            frameRate:8
        });
        this.soul = new Soul(this, 200, 100, "soul").setScale(.8, .8)
        this.soul.play("soul")


        //Bone Animation
        this.anims.create({
            key: "bone",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bone", {start: 0, end: 1, first: 0}),
            frameRate:8
        });
        this.bone = new Obstacle(this, 100, 100, "bone").setScale(.8, .8)
        this.bone.play("bone")


        //Skull
        this.anims.create({
            key: "skull",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("skull", {start: 0, end: 1, first: 0}),
            frameRate:8
        });
        this.skull = new Obstacle(this, 100, 200, "skull").setScale(.8, .8)
        this.skull.play("skull")


        //Score display
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            //backgroundColor: "#F3B141",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.p1Score = 0;
        this.add.text(70, 448, "Score: ", scoreConfig);
        this.score = this.add.text(90, 450, this.p1Score, scoreConfig);

        this.totalTime = 0;
        this.add.text(360, 448, "Time: ", scoreConfig);
        this.time1 = this.add.text(450, 450, this.totalTime, scoreConfig);

        this.level = 1;

    }

    update(){
        if(!this.gameOver){
            this.p1Boat.update()
            this.skull.update()
            this.bone.update()
            this.soul.update()
        }

        if(this.p1Boat.checkCollision(this.skull)){
            this.gameOver = true
        }

        

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.totalTime = this.time.now / 1000
        if(this.totalTime % 5 == 0){
            this.level += 1
            console.log(this.level)
        }

        this.time1.text = this.totalTime;
    }
}
