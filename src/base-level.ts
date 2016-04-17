import * as Phaser from 'phaser';
import {Player} from './player.ts';

export class BaseLevel extends Phaser.State {
  sprite: Phaser.Sprite
  cursors: Phaser.CursorKeys

  player: Player
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

    this.player = new Player(this.game);

    //Change the world size to match the size of this layer
    this.groundLayer.resizeWorld();

    //Make the camera follow the sprite
    this.game.camera.follow(this.player.sprite);

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.player.sprite, this.groundLayer);

    this.player.update(this.cursors);
    //this.game.debug.spriteInfo(this.sprite,32,32);

  }

  render() {
    // Enable debugging for player body.
    //this.game.debug.body(this.sprite);
  }
}
