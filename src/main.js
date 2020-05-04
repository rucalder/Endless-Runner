let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
<<<<<<< HEAD
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            //gravity: { y: 200 }
=======
    physics:{
        default: "arcade",
        arcade: {
            //debug: true,
>>>>>>> b3f592c3c757cf02be2b4def648db00c28919350
        }
    }
}

let game = new Phaser.Game(config);

function create(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(p1Boat, Phaser.Physics.ARCADE);
    game.physics.enable(skull, Phaser.Physics.ARCADE);
    game.physics.enable(bone, Phaser.Physics.ARCADE);
    game.physics.enable(soul, Phaser.Physics.ARCADE);
    game.physics.enable(ribcage, Phaser.Physics.ARCADE);
    game.physics.enable(spike, Phaser.Physics.ARCADE);
    game.physics.enable(spike2, Phaser.Physics.ARCADE);
    
}

game.settings = {
    obstacleSpeed: 1,
    gameTimer1: 60000,  
}

let keyA, keyLEFT, keyRIGHT, keyUP, keyDOWN;