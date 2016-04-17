import * as Phaser from 'phaser';
import {Player} from './player.ts';

export class BaseLevel extends Phaser.State {
  player: Player;
  map: Map;
  cursors: Phaser.CursorKeys;
  mapName: string;

  debug: boolean;

  constructor() {
    super();
    this.debug = false;
  }

  preload() {
    this.game.load.spritesheet('player', 'assets/tiles/cloud_water.png', 64,
                               64);
    this.game.load.tilemap('saturday_2', 'assets/saturday_2.json', null,
                           Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/tiles/saturday_roughfile.png');
  }

  init(mapName: string) { this.mapName = mapName; }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#a9f0ff";

    this.map = new Map(this.game, this.mapName);
    this.player = new Player(this.game, this.map);

    // Make the camera follow the sprite
    this.game.camera.follow(this.player.sprite);

    // Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

    let debugKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    debugKey.onDown.add(() => {this.debug = !this.debug});
  }

  update() {
    // TODO Instead of passing this directly, allow touch or keyboard input.
    this.player.update(this.cursors);
    if (this.debug) {
      this.game.debug.spriteInfo(this.player.sprite, 32, 32);
    }
  }

  render() {
    // Enable debugging for player body.
    if (this.debug) {
      this.game.debug.body(this.player.sprite);
    }
  }
}

export class Map {
  tileMap: Phaser.Tilemap;

  platformLayer: Phaser.TilemapLayer;
  ductLayer: Phaser.TilemapLayer;

  constructor(game: Phaser.Game, mapName: string) {
    // Add the tilemap and tileset image. The first parameter in addTilesetImage
    // is the name you gave the tilesheet when importing it into Tiled, the
    // second
    // is the key to the asset in Phaser
    this.tileMap = game.add.tilemap(mapName);
    this.tileMap.addTilesetImage('platforms_ducts', 'tiles');

    // Add both the background and ground layers. We won't be doing anything
    // with the
    // GroundLayer though
    this.ductLayer = this.tileMap.createLayer('ducts');
    this.platformLayer = this.tileMap.createLayer('platforms');

    // Before you can use the collide function you need to set what tiles can
    // collide
    this.tileMap.setCollisionBetween(1, 100, true, 'platforms');

    // Change the world size to match the size of this layer
    this.platformLayer.resizeWorld();

    this.makePlatformsOneWay();
  }

  // Example of how to work with the tilemap to change collision behavior.
  makePlatformsOneWay() {
    let d = this.tileMap.layers[this.platformLayer.index].data
    console.log(d);
    for (let row = 0; row < d.length; row++) {
      for (let col = 0; col < d[row].length; col++) {
        if (d[row][col].index > 0) {
          d[row][col].collideDown = false;
          d[row][col].collideLeft = false;
          d[row][col].collideRight = false;
        }
      }
    }
  }
}
