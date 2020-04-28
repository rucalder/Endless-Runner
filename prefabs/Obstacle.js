class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
    }

    update(){
        //left and right movement
        this.y -= game.settings.obstacleSpeed
        
        if(this.y <= 0 - this.height){
            this.destroy();
        }
    }

    //reset rocket to ground
    reset(){
        this.y = game.config.height;
    }
}