let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

function create(){
    game.physics.enable(p1Rocket, Phaser.Physics.ARCADE);
    game.physics.enable(p2Rocket, Phaser.Physics.ARCADE);
}