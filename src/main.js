let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

function create(){
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(p1Boat, Phaser.Physics.ARCADE);
    game.physics.enable(skull, Phaser.Physics.ARCADE);
    game.physics.enable(bone, Phaser.Physics.ARCADE);
    game.physics.enable(soul, Phaser.Physics.ARCADE);
}

game.settings = {
    obstacleSpeed: 1,
    gameTimer1: 60000,  
}

let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN;