class Soul extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
    }

    update(){
        //left and right movement
        this.y += game.settings.obstacleSpeed
        
        if(this.y >= game.config.height + this.height){
            this.reset();
        }
    }

    //reset rocket to ground
    reset(){
        this.y = Phaser.Math.Between(-300, 0);
        this.x = Phaser.Math.Between(80, 500)
    }
}