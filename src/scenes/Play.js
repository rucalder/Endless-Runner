class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.spritesheet("bone", "./assets/bone.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("skull", "./assets/skull.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("soul", "./assets/soul sprite.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("spike", "./assets/spike.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("2spike", "./assets/2spike.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("ribcage", "./assets/ribcage.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("charon", "./assets/CHARON SPRITE.png", {frameWidth: 32, frameHeight: 32})
        this.load.image("river", "./assets/RIVER SPRITE.png")
        this.load.image("shadowSmall", "./assets/Shadow1.png");
        this.load.image("shadowLarge", "./assets/Shadow2.png");
        this.load.audio('bgmusic', './assets/CharonMusicDone.mp3');
        this.load.audio('crash', './assets/crash.wav');
        this.load.audio('soulSound', './assets/soulSound.wav');
    }

    create(){
        //bg music for game
        this.bgmusic = this.sound.add('bgmusic');
        //soul sound 
        this.soulSound = this.sound.add('soulSound');
        //game over sound
        this.crash = this.sound.add('crash');

        this.bgmusic.play({
            volume: .5,
            loop: true
        })
        
        this.gameOver = false

        //River 
        this.river = this.add.tileSprite(0, 0, 640, 480, "river").setOrigin(0, 0)

        //Boat
        this.p1Boat = new Boat(this, 310, 400).setOrigin(0, 0).setScale(1.1, 1.1)

        

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

        
        

        


        //Bone Animation
        this.anims.create({
            key: "bone",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bone", {start: 0, end: 1, first: 0}),
            frameRate:8
        });
        this.bone = new Obstacle(this, 100, 100).setScale(1.5,1.5)
        this.bone.play("bone")
        this.bone.setSize(16, 16, true);


        //Skull
        this.anims.create({
            key: "skull",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("skull", {start: 0, end: 1, first: 0}),
            frameRate:8
        });
        this.skull = new Obstacle(this, 100, 200).setScale(1.5, 1.5)
        this.skull.play("skull")
        this.skull.setSize(16, 16, true);

        //ribcage
        this.anims.create({
            key: "ribcage",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("ribcage", {start: 0, end: 1, first: 0}),
            frameRate:8
        });
        this.ribcage = new Obstacle(this, 0, 0).setScale(1.5, 1.5)
        this.ribcage.play("ribcage")
        this.ribcage.setActive(false).setVisible(false);
        this.ribcage.setSize(16, 16, true);

        //spike
        this.anims.create({
            key: "spike",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("spike", {start: 0, end: 1, first: 0}),
            frameRate:8
        });
        this.spike = new Obstacle(this, 0, 0).setScale(1.5, 1.5)
        this.spike.play("spike")
        this.spike.setActive(false).setVisible(false);
        this.spike.setSize(16, 16, true);

        //spike2
        this.anims.create({
            key: "2spike",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("2spike", {start: 0, end: 1, first: 0}),
            frameRate:8
        });
        this.spike2 = new Obstacle(this, 0, 0).setScale(1.5, 1.5)
        this.spike2.play("2spike")
        this.spike2.setActive(false).setVisible(false);
        this.spike2.setSize(16, 16, true);

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

        this.clock2 = this.time.delayedCall(10000, () => {
            this.ribcage.setActive(true).setVisible(true);
            this.ribcage.reset()
        }, null, this);

        this.clock3 = this.time.delayedCall(20000, () => {
            this.spike.setActive(true).setVisible(true);
            this.spike.reset()
        }, null, this);
        this.clock4 = this.time.delayedCall(30000, () => {
            this.spike2.setActive(true).setVisible(true);
            this.spike2.reset()
        }, null, this);

        

        this.totalTime = 0;
        this.add.text(360, 5, "Time: ", this.scoreConfig);
        this.time1 = this.add.text(450, 5, this.totalTime, this.scoreConfig);

        this.level = 1;
        this.levelCheck = 0;  


        //DarkCircles
        let circleSize = 5;
        this.p1CircleLarge = new Darkness(this, 320, 440, "shadowLarge")
        this.p1CircleSmall = new Darkness(this, 320, 440, "shadowSmall").setScale(circleSize, circleSize)
        this.p1CircleLarge.alpha = 0.7

        this.p1CircleLarge.enableBody = true;
        this.p1CircleSmall.enableBody = true;

        // Soul Animation
        this.anims.create({
            key: "soul",
            repeat: -1,
            frames: this.anims.generateFrameNumbers("soul", {start: 0, end: 2, first: 0}),
            frameRate:8
        });
        this.soul = new Obstacle(this, 560, 100).setScale(1.5, 1.5)
        this.soul.play("soul")

    }

    update(){
        
        if(!this.gameOver){
            this.river.tilePositionY -= game.settings.obstacleSpeed;
            this.p1Boat.update()
            this.p1CircleLarge.update()
            this.p1CircleSmall.update()
            this.skull.update()
            this.bone.update()
            this.soul.update()
            if(this.clock2.getProgress() == 1){
                this.ribcage.update()
            }
            if(this.clock3.getProgress() == 1){
                this.spike.update()
            }
            if(this.clock4.getProgress() == 1){
                this.spike2.update()
            }
            this.time1.text = this.clock1.getElapsedSeconds();
        }
        if(this.gameOver){
            this.displayText();
        }

        //check collisions
        if(this.checkCollision(this.p1Boat, this.bone)) {
            console.log('dead bone');
            this.boatDead(this.p1Boat);
            this.bone.reset();
            this.gameOver = true;
        }
        if(this.checkCollision(this.p1Boat, this.skull)) {
            console.log('dead skull');
            this.boatDead(this.p1Boat);
            this.skull.reset();
            this.gameOver = true;
        }
        if(this.checkCollision(this.p1Boat, this.ribcage)) {
            console.log('dead rib');
            this.boatDead(this.p1Boat);
            this.ribcage.reset();
            this.gameOver = true;
        }
        if(this.checkCollision(this.p1Boat, this.spike)) {
            console.log('dead spike');
            this.boatDead(this.p1Boat);
            this.spike.reset();
            this.gameOver = true;
        }
        if(this.checkCollision(this.p1Boat, this.spike2)) {
            console.log('dead spike2');
            this.boatDead(this.p1Boat);
            this.spike2.reset();
            this.gameOver = true;
        }
        let circleSize = 5;
        if(this.checkCollision(this.p1Boat, this.soul)) {
            console.log('collect soul');
            this.soulSound.play({
                volume: .3,
                loop: false
            })
            //shrink circle
            this.p1CircleSmall.setScale(this.circleDarken(circleSize), this.circleDarken(circleSize))
            this.p1Score += 1;
            this.soul.reset();
        }
        this.score.text = this.p1Score

        // check key input for restart
        if(Phaser.Math.FloorTo(this.clock1.getElapsedSeconds()) % 5 == 0){
            this.levelCheck += 1
            //console.log(this.level)
        }
        this.level = this.levelCheck/100
        game.settings.obstacleSpeed = this.level
        
    }

    checkCollision(boat, obstacle){
        if (boat.x < obstacle.x + obstacle.width && 
            boat.x + boat.width > obstacle.x && 
            boat.y < obstacle.y + obstacle.height &&
            boat.height + boat.y > obstacle.y) {
                return true;
        } else {
            return false;
        }
    }

    circleDarken(circleScale){
        circleScale = circleScale - 1;
        return circleScale;
    }

    boatDead(boat){
        boat.alpha = 0;
        this.crash.play({
            volume: .08,
            loop: false
        })
    }

    gameOver1(){
        this.gameOver = true
    }

    displayText(){
        this.bgmusic.stop()

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