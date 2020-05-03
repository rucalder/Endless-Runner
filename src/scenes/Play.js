class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.spritesheet("bone", "./assets/bone sprite.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("skull", "./assets/skull sprite.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("soul", "./assets/soul sprite.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("charon", "./assets/CHARON SPRITE.png", {frameWidth: 32, frameHeight: 32})
        this.load.audio('bgmusic', './assets/CharonMusicDone.mp3');
        this.load.audio('crash', './assets/crash.wav');
    }

    create(){
        
        //bg music for game
        this.bgmusic = this.sound.add('bgmusic');

        var musicConfig = {
            mute: false,
            volume: .3,
            loop: true,
        }
        
        this.bgmusic.play(musicConfig);

        //initiate crashing noise
        this.crash = this.sound.add('crash')
        
        this.gameOver = false

        // Borders
        this.add.rectangle(0, 0, 64, 500, 0xF5F5DC).setOrigin(0, 0);
        this.add.rectangle(576, 0, 64, 500, 0xF5F5DC).setOrigin(0, 0);
        this.add.rectangle(64, 0, 512, 500, 0x256d7b).setOrigin(0, 0);
        //this.temp = this.add.rectangle(320, 5, 16, 25, 0xFFFFFF).setOrigin(0, 0);

        this.p1Boat = new Boat(this, 320, 440, "charon").setOrigin(0, 0)
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
        this.soul = new Soul(this, 560, 100, "soul").setScale(.8, .8)
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
        this.scoreConfig = {
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
        this.add.text(70, 5, "Score: ", this.scoreConfig);
        this.score = this.add.text(100, 5, this.p1Score, this.scoreConfig);
        



        this.clock1 = this.time.delayedCall(99999999999999999, () => {
            
        }, null, this);
        this.totalTime = 0;
        this.add.text(360, 5, "Time: ", this.scoreConfig);
        this.time1 = this.add.text(450, 5, this.totalTime, this.scoreConfig);

        this.level = 1;
        this.levelCheck = 0;  

        this.soulGroup = this.add.group()
        this.soulGroup.add(this.soul)

        this.obstacleGroup = this.add.group()
        this.obstacleGroup.add(this.skull)
        this.obstacleGroup.add(this.bone)

        //Phaser.Physics.Arcade.Collider(this.p1Boat, this.obstacleGroup, this.gameOver1())
        
        /*this.collider = this.physics.add.collider(this.p1Boat, this.obstacleGroup, function(){
            this.gameOver = true
        })*/

    }

    update(){
        if(!this.gameOver){
            this.p1Boat.update()
            this.skull.update()
            this.bone.update()
            this.soul.update()
            this.time1.text = this.clock1.getElapsedSeconds();
        }
        if(this.gameOver){
            this.displayText();
            this.bgmusic.stop();
        }

        if(this.p1Boat.checkCollision(this.soul)){
            this.p1Score += 1
            this.soul.reset()
        }
        if(this.p1Boat.checkCollision(this.obstacleGroup)){
            this.gameOver = true
        }
        if(this.p1Boat.checkCollision(this.bone)){
            this.gameOver = true
        }
        this.score.text = this.p1Score
        
        

        /*if(this.game.physics.arcade.collide(this.p1Boat, this.obstacleGroup)){
            this.gameOver = true
        }

        /*this.world.collide(this.p1Boat, this.obstacleGroup, function(){
            this.gameOver = true
        })*/
        /*if(Phaser.Math.FloorTo(this.clock1.getElapsedSeconds() / 1.1) != 0){
            Phaser.Physics.Arcade.Collider(this.p1Boat, this.obstacleGroup, this.gameOver1())
        }*/
        

        // check key input for restart
        if(Phaser.Math.FloorTo(this.clock1.getElapsedSeconds()) % 5 == 0){
            this.levelCheck += 1
            //console.log(this.level)
        }
        this.level = this.levelCheck/100
        game.settings.obstacleSpeed = this.level
        
    }
        

    gameOver1(){
        this.gameOver = true
    }

    displayText(){

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

        let centerX = game.config.width/2
        let centerY = game.config.height/2

        this.add.text(centerX, centerY - 100, 'GAME OVER', menuConfig).setOrigin(0.5);
            let restart = this.add.text(centerX - 100, centerY, "Restart", menuConfig).setOrigin(0.5);
            restart.setInteractive();
            restart.on("pointerup", () =>{
                this.time.now = 0
                this.totalTime = 0
                this.scene.restart("playScene");
            })
            let menu = this.add.text(centerX + 100, centerY, "Menu", menuConfig).setOrigin(0.5);
            menu.setInteractive();
            menu.on("pointerup", () =>{
                this.time.now = 0
                this.totalTime = 0
                this.scene.start("menuScene");
            })
    }
}
