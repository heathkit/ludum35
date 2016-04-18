import * as Phaser from 'phaser';
import {Player} from './player.ts';

class BaseLevel extends Phaser.State {
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
    this.game.load.image('steam', 'assets/images/steam.png');
    this.game.load.spritesheet('player', 'assets/tiles/all_characters.png', 64,
                               64);
    this.game.load.image('platforms', 'assets/tiles/platforms.png');
    this.game.load.image('pipes', 'assets/tiles/all_pipes.png');
    this.game.load.image('grates', 'assets/tiles/grates.png');
    this.game.load.image('fans', 'assets/tiles/fans.png');
  }

  init(mapName: string) { this.mapName = mapName; }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = "#a9f0ff";

    // Possible fix for jittery sprites.
    // See http://www.html5gamedevs.com/topic/15266-phaser-camera-jittering/
    this.game.renderer.renderSession.roundPixels = true;

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

// Individual levels are subclasses of BaseLevel so we can override stuff
// as needed.
export class SaturdayLevel extends BaseLevel {
  preload() {
    super.preload();
    this.game.load.tilemap('saturday_2', 'assets/saturday_2.json', null,
                           Phaser.Tilemap.TILED_JSON);
  }

  create() {
    // TODO: Unfuck this bullshit.
    LEFT_VENT_IDX = 4;
    RIGHT_VENT_IDX = 6;
    this.map = new Map(this.game, 'saturday_2');
    super.create();
  }
}

export class SundayLevel extends BaseLevel {
  preload() {
    super.preload()
    this.game.load.tilemap('sunday', 'assets/sunday.json', null,
                           Phaser.Tilemap.TILED_JSON);
  }

  create() {
      LEFT_VENT_IDX = 18;
      RIGHT_VENT_IDX = 20;
      this.map = new Map(this.game, 'sunday');
      super.create();
  }
}

  // Indecies of special tiles in the tilemap.
var LEFT_VENT_IDX: number;
var RIGHT_VENT_IDX: number;

export class Map {
  tileMap: Phaser.Tilemap;

  private platformLayer: Phaser.TilemapLayer;
  private ductLayer: Phaser.TilemapLayer;
  private game: Phaser.Game;

  ventCallback: (from: Phaser.Point, to: Phaser.Point) => void;
  private lastVentEventSent: number;

  // Special tile flags
  private overVent: boolean;

  constructor(game: Phaser.Game, mapName: string) {
    this.overVent = false;
    this.game = game;

    // Cheat so we can send vent events at the start of the game.
    this.lastVentEventSent = -10;

    // Add the tilemap and tileset image. The first parameter in addTilesetImage
    // is the name you gave the tilesheet when importing it into Tiled, the
    // second
    // is the key to the asset in Phaser
    this.tileMap = game.add.tilemap(mapName);
    this.tileMap.addTilesetImage('platforms', 'platforms');
    this.tileMap.addTilesetImage('grates', 'grates');
    this.tileMap.addTilesetImage('pipes', 'pipes');

    // Add both the background and ground layers. We won't be doing anything
    // with the
    // GroundLayer though
    this.ductLayer = this.tileMap.createLayer('ducts');
    this.platformLayer = this.tileMap.createLayer('platforms');

    // TODO: load the fans and make them spin.
    /*
      //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group
     map.createFromObjects('fans', 34, 'coin', 0, true, false, coins);

     //  Add animations to all of the coin sprites
     coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);
     coins.callAll('animations.play', 'animations', 'spin');
    */

    // Before you can use the collide function you need to set what tiles can
    // collide
    this.tileMap.setCollisionBetween(1, 100, true, 'platforms');

    // Exclude pipe tiles from collsion on the duct layer.
    this.tileMap.setCollisionByExclusion([ 5 ], true, 'ducts');

    // Change the world size to match the size of this layer
    this.platformLayer.resizeWorld();

    this.tileMap.setTileIndexCallback([ LEFT_VENT_IDX, RIGHT_VENT_IDX ],
                                      this.onVentHit, this, 'ducts');
  }

  // Callback triggered when a sprite collides with a vent.
  onVentHit(sprite: Phaser.Sprite, tile: Phaser.Tile) {
    // Only register the collision if we have a callback.
    if (this.ventCallback) {
      // Debounce this event.
      let elapsedSinceLastEvent =
          this.game.time.totalElapsedSeconds() - this.lastVentEventSent

      // This delay is set to give us time to exit the vent after getting
      // sucked through it. A better way would be to have the ventCallback
      // return whether we should respect collisions.
      if (elapsedSinceLastEvent >= 4) {
        // Send a callback with the enter and exit points.
        let height = tile.height / 2 - 20;
        let width = tile.width / 2;
        let from = new Phaser.Point(tile.worldX + width, tile.worldY + height);
        let otherVent = this.getOtherVent(tile);
        let to = new Phaser.Point(otherVent.worldX + width,
                                  otherVent.worldY + height);
        this.ventCallback(from, to);
        this.lastVentEventSent = this.game.time.totalElapsedSeconds();
      }
      return true;
    }
    return false;
  }

  // Given a vent tile, find the other vent tile in this map.
  getOtherVent(tile: Phaser.Tile) {
    let exitType = LEFT_VENT_IDX;
    if (tile.index == LEFT_VENT_IDX) {
      exitType = RIGHT_VENT_IDX;
    }
    let d = this.tileMap.layers[this.ductLayer.index].data
    console.log(d);
    for (let row = 0; row < d.length; row++) {
      for (let col = 0; col < d[row].length; col++) {
        if (d[row][col].index == exitType) {
          return d[row][col];
        }
      }
    }
  }

  collidePlatforms(sprite: Phaser.Sprite) {
    this.game.physics.arcade.collide(sprite, this.platformLayer);
  }

  collideDucts(sprite: Phaser.Sprite) {
    this.game.physics.arcade.collide(sprite, this.ductLayer);
  }

  // Example of how to work with the tilemap to change collision behavior.
  // No longer used, but it shows how to search through the tile map.
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
