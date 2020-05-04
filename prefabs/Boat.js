class Boat extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
    }

    update(){
        //left and right movement
        if (keyLEFT.isDown && this.x >= 64){
            this.x -= 2;
        }
        if (keyRIGHT.isDown && this.x <= 560){
            this.x += 2;
        }
        if (keyDOWN.isDown && this.y <= 465){
            this.y += 2;
        }
        if (keyUP.isDown && this.y >= 5){
            this.y -= 2;
        }
        
    }
}