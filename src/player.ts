import * as Phaser from 'phaser';
import {Map} from './base-level.ts';

enum States {
    Dude,
    Water,
    Steam,
    Ice
}

export class Player {
  sprite: Phaser.Sprite;

  currentState: States;
  game: Phaser.Game;
  map: Map;

  constructor(game: Phaser.Game, map: Map) {
    this.game = game;
    this.map = map;

    //Add the sprite to the game and enable arcade physics on it
    this.sprite = game.add.sprite(10, 0, 'dude');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(42,56,0,0);
    this.sprite.debug = true;

    //Set some physics on the sprite
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 2000;
    this.sprite.body.collideWorldBounds = true;

    //Create a running animation for the sprite and play it
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    this.sprite.animations.add('left', [1, 2, 3, 4], 10, true);

    let dudeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    let waterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    let steamKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);

    dudeKey.onDown.add(() => {this.changeState(States.Dude)});
    waterKey.onDown.add(() => {this.changeState(States.Water)});
    steamKey.onDown.add(() => {this.changeState(States.Steam)});

    // Start as water.
    this.changeState(States.Water);
  }

  private changeState(newState: States) {
    this.currentState = newState;
  }

  update(cursors: Phaser.CursorKeys) {
    //Make the sprite collide with the ground layer
    this.game.physics.arcade.collide(this.sprite, this.map.platformLayer);

    //Make the sprite jump when the up key is pushed
    if(cursors.up.isDown) {
      this.sprite.body.velocity.y = -500;
    } else if(cursors.left.isDown) {
      this.sprite.body.velocity.x = -500;
      this.sprite.animations.play('left');
    } else if(cursors.right.isDown) {
      this.sprite.body.velocity.x = 500;
      this.sprite.animations.play('right');
    } else {
      this.sprite.body.velocity.x = 0;
      this.sprite.animations.stop();
    }

    // TODO: Remove this hack for falling through the floor.
    if (this.sprite.y > 670) {
      this.sprite.y = 650;
      this.sprite.body.velocity.x = 0;
    }

    this.sprite.debug = true;
  }
}
