import * as Phaser from 'phaser';
import {Map} from './base-level.ts';

export class Player {
  game: Phaser.Game;
  map: Map;
  sprite: Phaser.Sprite;

  currentState: CharacterState;
  waterState: Water;
  steamState: Steam;
  iceState: Ice;

  constructor(game: Phaser.Game, map: Map) {
    this.game = game;
    this.map = map;

    // Add the sprite to the game and enable arcade physics on it
    this.sprite = game.add.sprite(10, 500, 'player');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(48, 48, 8, 6);
    this.sprite.debug = true;

    // Set some physics on the sprite
    this.sprite.body.collideWorldBounds = true;

    // The different characters are different frames in the same spritesheet.
    this.sprite.animations.add('steam', [ 5, 6, 7, 6 ], 7, true);
    this.sprite.animations.add('water', [ 1 ], 0, false);
    this.sprite.animations.add('water_drain', [ 1, 2, 3 ], 3, false);
    this.sprite.animations.add('ice', [ 0 ], 10, true);

    this.waterState = new Water(this.sprite, this.map, this.game);
    this.steamState = new Steam(this.sprite, this.map, this.game);
    this.iceState = new Ice(this.sprite, this.map, this.game);

    let waterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    let steamKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    let iceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);

    // dudeKey.onDown.add(() => {this.changeState()});
    waterKey.onDown.add(() => {this.changeState(this.waterState)});
    steamKey.onDown.add(() => {this.changeState(this.steamState)});
    iceKey.onDown.add(() => {this.changeState(this.iceState)});

    // Start as water.
    this.changeState(this.waterState);
  }

  private changeState(newState: CharacterState) {
    if (this.currentState) {
      if (!this.currentState.cleanup()) {
        console.log("Not allowed to change state!");
        return;
      }
    }
    newState.init();
    this.currentState = newState;
    console.log("Becoming state ", newState);
  }

  update(cursors: Phaser.CursorKeys) {

    this.currentState.update(cursors);

    // Clamp velocity so we don't clip through platforms.
    this.sprite.body.velocity.y =
        Phaser.Math.clamp(this.sprite.body.velocity.y, -1000, 1000);

    // Player dies when they fall off the level.
    let floor = this.map.tileMap.heightInPixels - 10;
    let feet = this.sprite.body.y + this.sprite.body.height;
    if (feet > floor) {
      console.log("You died");
      window.alert("You died");
      this.game.state.start(this.game.state.current);
    }
  }
}

class CharacterState {
  sprite: Phaser.Sprite;
  map: Map
  game: Phaser.Game;

  constructor(sprite: Phaser.Sprite, map: Map, game: Phaser.Game) {
    this.sprite = sprite;
    this.map = map;
    this.game = game;
  }

  init() { console.log("Init unimplemented") }

  update(cursors: Phaser.CursorKeys) { console.log("Update unimplemented") }

  // Clean up the state before switching. Will
  // return false if the state does not allow switching.
  cleanup(): boolean { return true; }
}

class Ice extends CharacterState {
  init() {
    this.sprite.animations.play('ice');
    this.sprite.body.bounce.y = 0;
    this.sprite.body.gravity.y = 4000;
  }

  update(cursors: Phaser.CursorKeys) {
    // Ice collides with platforms but cannot be controlled.
    this.map.collidePlatforms(this.sprite, false);
    this.map.collideFans(this.sprite);
  }
}

class Water extends CharacterState {
  init() {
    this.sprite.animations.play('water');

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 1500;
  }

  update(cursors: Phaser.CursorKeys) {
    // Make the sprite collide with the ground layer
    this.map.collidePlatforms(this.sprite, true);

    // Water can slide around.
    if (cursors.left.isDown) {
      this.sprite.body.velocity.x = -500;
    } else if (cursors.right.isDown) {
      this.sprite.body.velocity.x = 500;
    } else {
      this.sprite.body.velocity.x = 0;
    }
  }
}

class Steam extends CharacterState {
  teleporting: boolean;

  lastExitVent: number;
  emitter: any;

  constructor(sprite: Phaser.Sprite, map: Map, game: Phaser.Game) {
    super(sprite, map, game);
    this.makeSteamTrail();
  }

  init() {
    this.lastExitVent = 0;
    this.teleporting = false;
    this.sprite.animations.play("steam");
    this.startPhysics();

    this.map.ventCallback =
        (from, to) => { this.teleportThroughVent(from, to) };
  }

  private makeSteamTrail() {
    this.emitter = this.game.add.emitter(0, 0, 20);
    this.emitter.makeParticles('steam');
    this.emitter.setXSpeed(0, 0);
    this.emitter.setYSpeed(0, 0);

    this.emitter.setRotation(0, 0);
    this.emitter.setAlpha(.5, 0, 3000);
    this.emitter.setScale(0.2, 1, 0.2, 1, 6000, Phaser.Easing.Quintic.Out);
    this.emitter.gravity = 25;

    this.emitter.start(false, 3000, 50);
    this.emitter.on = false;
  }

  private startPhysics() {
    this.sprite.body.bounce.y = 0.4;
    this.sprite.body.gravity.y = -1000;
  }

  private disablePhysics() {
    this.sprite.body.gravity.y = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.velocity.x = 0;
  }

  private teleportThroughVent(from, to) {
    this.teleporting = true;
    this.disablePhysics();
    console.log("Teleport from ", from, to);

    let shrink = this.game.add.tween(this.sprite.scale)
                     .to({x : 0.1, y : 0.1}, 500, Phaser.Easing.Cubic.In);
    let expand = this.game.add.tween(this.sprite.scale)
                     .to({x : 1, y : 1}, 500, Phaser.Easing.Cubic.Out);

    let enterVent =
        this.game.add.tween(this.sprite).to(from, 500, Phaser.Easing.Cubic.In);
    let moveToExit =
        this.game.add.tween(this.sprite).to(to, 1000, Phaser.Easing.Cubic.In);

    enterVent.chain(moveToExit);
    enterVent.onStart.add(() => {shrink.start()});
    // Hide the sprite during teleport
    moveToExit.onStart.add(() => {
      this.emitter.on = true;
      this.sprite.visible = false
    });
    moveToExit.onComplete.add(() => {
      this.emitter.on = false;
      this.sprite.visible = true
    });
    moveToExit.chain(expand);

    expand.onComplete.add(() => {
      console.log("Teleport done");
      this.teleporting = false;
      this.startPhysics();
    })
    enterVent.start();
  }

  cleanup() {
    if (this.teleporting) {
      return false;
    }
    this.map.ventCallback = undefined;
    return true;
  }

  update(cursors: Phaser.CursorKeys) {
    // Steam just rises uncontrollably.
    this.emitter.emitX = this.sprite.x;
    this.emitter.emitY = this.sprite.y;

    // Ignore collisions during teleport.
    if (!this.teleporting) {
      this.map.collideDucts(this.sprite);
      this.map.collidePlatforms(this.sprite, true);
      this.map.collideFans(this.sprite);
    }
  }
}
