class Darkness extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
    }

    update(){
        //left and right movement
        if (keyLEFT.isDown && this.x >= 74){
            this.x -= 4;
        }
        if (keyRIGHT.isDown && this.x <= 570){
            this.x += 4;
        }
        if (keyDOWN.isDown && this.y <= 505){
            this.y += 4;
        }
        if (keyUP.isDown && this.y >= 45){
            this.y -= 4;
        }
        
    }

}