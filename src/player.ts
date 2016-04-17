import * as Phaser from 'phaser';

export class Player {
  sprite: Phaser.Sprite;

  constructor(game: Phaser.Game) {
    //Add the sprite to the game and enable arcade physics on it
    this.sprite = game.add.sprite(10, 0, 'dude');
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(42,56,0,0);
    this.sprite.debug = true;

    //Set some physics on the sprite
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 2000;
    this.sprite.body.collideWorldBounds = true;

    //Create a running animation for the sprite and play it
    this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
    this.sprite.animations.add('left', [1, 2, 3, 4], 10, true);
  }

  update(cursors: Phaser.CursorKeys) {
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
