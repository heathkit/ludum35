import * as Phaser from 'phaser';
import {Map} from './base-level.ts';

export class Player {
  game: Phaser.Game;
  map: Map;
  sprite: Phaser.Sprite;

  currentState: CharacterState;
  waterState: Water;
  steamState: Steam;

  constructor(game: Phaser.Game, map: Map) {
    this.game = game;
    this.map = map;

    // Add the sprite to the game and enable arcade physics on it
    this.sprite = game.add.sprite(10, 0, 'player');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(48, 48, 8, 6);
    this.sprite.debug = true;

    // Set some physics on the sprite
    this.sprite.body.collideWorldBounds = true;

    // The different characters are different frames in the same spritesheet.
    this.sprite.animations.add('steam', [ 0, 1, 2, 1 ], 7, true);
    this.sprite.animations.add('water', [ 3 ], 10, true);

    this.waterState = new Water(this.sprite, this.map);
    this.steamState = new Steam(this.sprite, this.map);

    let dudeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    let waterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    let steamKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);

    // dudeKey.onDown.add(() => {this.changeState()});
    waterKey.onDown.add(() => {this.changeState(this.waterState)});
    steamKey.onDown.add(() => {this.changeState(this.steamState)});

    // Start as water.
    this.changeState(this.waterState);
  }

  private changeState(newState: CharacterState) {
    newState.init();
    if (this.currentState) {
      this.currentState.cleanup();
    }
    this.currentState = newState;
    console.log("Becoming state ", newState);
  }

  update(cursors: Phaser.CursorKeys) {

    this.currentState.update(cursors);

    // Clamp velocity so we don't clip through platforms.
    this.sprite.body.velocity.y =
        Phaser.Math.clamp(this.sprite.body.velocity.y, -750, 750);

    // TODO: Determine bottom of the level from the map.
    if (this.sprite.y > 670) {
      this.sprite.y = 650;
      this.sprite.body.velocity.x = 0;
    }
  }
}

class CharacterState {
  sprite: Phaser.Sprite;
  map: Map

  constructor(sprite: Phaser.Sprite, map: Map) {
    this.sprite = sprite;
    this.map = map;
  }

  init() { console.log("Init unimplemented") }

  update(cursors: Phaser.CursorKeys) { console.log("Update unimplemented") }

  cleanup() {}
}

class Water extends CharacterState {
  init() {
    this.sprite.animations.play('water');

    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 2000;
  }

  update(cursors: Phaser.CursorKeys) {
    // Make the sprite collide with the ground layer
    this.map.collidePlatforms(this.sprite);

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
  init() {
    this.sprite.animations.play("steam");

    this.sprite.body.bounce.y = 0.4;
    this.sprite.body.gravity.y = -2000;
    this.map.ventCallback =
        (from, to) => { console.log("Teleport between ", from, to); };
  }

  cleanup() { this.map.ventCallback = undefined; }

  update(cursors: Phaser.CursorKeys) {
    // Steam just rises uncontrollably.

    // If we pass by a vent, get sucked into the ducts.
    this.map.collideDucts(this.sprite);

    // Maybe do a tween to shrink the cloud?
  }
}
