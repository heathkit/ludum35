import * as Phaser from 'phaser';
import {Player} from './player.ts';

export class BaseLevel extends Phaser.State {
  sprite: Phaser.Sprite
  cursors: Phaser.CursorKeys

  player: Player
  map: Phaser.Tilemap
  platformLayer: Phaser.TilemapLayer
  ductLayer: Phaser.TilemapLayer

  debug: boolean;

  constructor() {
    super();
    this.debug = false;
  }

  init() {
  }

  preload() {
     this.game.load.spritesheet('dude', 'assets/images/dude.png', 42, 64);
     this.game.load.tilemap('tilemap', 'assets/saturday_2.json', null, Phaser.Tilemap.TILED_JSON);
     this.game.load.image('tiles', 'assets/tiles/saturday_roughfile.png');
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
    this.map.addTilesetImage('platforms_ducts', 'tiles');

    //Add both the background and ground layers. We won't be doing anything with the
    //GroundLayer though
    this.ductLayer = this.map.createLayer('ducts');
    this.platformLayer = this.map.createLayer('platforms');

    // Scales the layer, but the sprite ends up clipped.
    //this.groundLayer.setScale(0.6,0.6);

    //Before you can use the collide function you need to set what tiles can collide
    this.map.setCollisionBetween(1, 100, true, 'platforms');
    // Create custom collision boxes for the platforms.
    console.log(this.map.layers);

    this.player = new Player(this.game);

    //Change the world size to match the size of this layer
    this.platformLayer.resizeWorld();

    //Make the camera follow the sprite
    this.game.camera.follow(this.player.sprite);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

    let debugKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    debugKey.onDown.add(() => {this.debug = !this.debug});
  }


  update() {
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.player.sprite, this.platformLayer);

    this.player.update(this.cursors);
    if (this.debug) {
      this.game.debug.spriteInfo(this.player.sprite,32,32);
    }
  }

  render() {
    // Enable debugging for player body.
    if (this.debug) {
      this.game.debug.body(this.player.sprite);
    }
  }
}
