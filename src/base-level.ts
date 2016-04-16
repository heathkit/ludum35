
import * as Phaser from 'phaser';

export class BaseLevel extends Phaser.State {
  sprite: Phaser.Sprite
  cursors: Phaser.CursorKeys

  map: Phaser.Tilemap
  backgroundLayer: Phaser.TilemapLayer
  groundLayer: Phaser.TilemapLayer

  constructor() {
    super();
  }

  init() {
  }

  preload() {
     this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
     this.game.load.tilemap('tilemap', 'assets/friday_night.json', null, Phaser.Tilemap.TILED_JSON);
     this.game.load.image('tiles', 'assets/friday_night_tilesheet.png');
  }

  create() {
    //Start the Arcade Physics systems
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Change the background colour
    this.game.stage.backgroundColor = "#a9f0ff";

    //Add the tilemap and tileset image. The first parameter in addTilesetImage
    //is the name you gave the tilesheet when importing it into Tiled, the second
    //is the key to the asset in Phaser
    this.map = this.game.add.tilemap('tilemap');
    this.map.addTilesetImage('platform', 'tiles');

    //Add both the background and ground layers. We won't be doing anything with the
    //GroundLayer though
    //this.backgroundLayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('platform');
    //this.groundLayer.scale.set(0.9,0.9);

    //Before you can use the collide function you need to set what tiles can collide
    this.map.setCollisionBetween(1, 100, true, 'platform');

    //Add the sprite to the game and enable arcade physics on it
    this.sprite = this.game.add.sprite(10, 0, 'dude');
    this.game.physics.arcade.enable(this.sprite);

    //Change the world size to match the size of this layer
    this.groundLayer.resizeWorld();

    //Set some physics on the sprite
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 2000;
    //this.sprite.body.gravity.x = 20;
    //this.sprite.body.velocity.x = 100;

    //Create a running animation for the sprite and play it
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    this.sprite.animations.add('left', [1, 2, 3, 4], 10, true);

    //Make the camera follow the sprite
    this.game.camera.follow(this.sprite);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.sprite, this.groundLayer);

    //Make the sprite jump when the up key is pushed
    if(this.cursors.up.isDown) {
      this.sprite.body.velocity.y = -500;
    } else if(this.cursors.left.isDown) {
      this.sprite.body.velocity.x = -500;
      this.sprite.animations.play('left');
    } else if(this.cursors.right.isDown) {
      this.sprite.body.velocity.x = 500;
      this.sprite.animations.play('right');
    } else {
      this.sprite.body.velocity.x = 0;
      this.sprite.animations.stop();
    }

    // TODO: Remove this hack for falling through the floor.
    if (this.sprite.y > 1100) {
      this.sprite.y = 1000;
    }

  }
}
