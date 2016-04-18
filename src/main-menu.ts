import * as Phaser from 'phaser';

export class MainMenu extends Phaser.State {

  bar: Phaser.Graphics;
  startRect: Phaser.Rectangle;

  constructor() {
    super();
  }

  preload() {
    this.game.load.spritesheet('player', 'assets/tiles/all_characters.png', 64,
                                                              64);

  }

  create() {
    this.game.stage.backgroundColor = '#337799';

    let titleStyle = {
      font : "bold 46px Arial",
      fill : "#d30",
      boundsAlignH : "center",
      boundsAlignV : "middle"
    };
    let title = this.game.add.text(0, 0, "Dr. Phase!", titleStyle);
    title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    title.setTextBounds(0, 0, 800, 100);

    let water = this.game.add.sprite(50, 100, 'player')
    water.frame = 1;
    this.drawText(120, 80, "Press '1' to become water. As water, you can move around with the arrow keys, but you'll fall through grates and drains.");

    let steam = this.game.add.sprite(50, 200, 'player')
    steam.frame = 5;
    this.drawText(120, 180, "Press '2' to become steam. Steam rises and is blown by fans.");


    let ice = this.game.add.sprite(50, 300, 'player')
    ice.frame = 0;
    this.drawText(120, 280, "Press '3' to become ice. Ice falls fast and is also blown by fans.");

    let rect = new Phaser.Rectangle(300, 450, 200, 100);
    this.bar = this.game.add.graphics();

    let style =  {
      font : "bold 46px Arial",
      fill : "#0d3",
      boundsAlignH : "center",
      boundsAlignV : "middle"
    };
    let text = this.game.add.text(0, 0, "START", style);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    text.setTextBounds(rect.x, rect.y, rect.width, rect.height);
    this.startRect = rect;

    this.game.input.onDown.add((event) => {
      if (rect.contains(this.game.input.x, this.game.input.y)) {
        this.game.state.start('Sunday', true, false);
      }
    });
  }

  update() {
    let rect = this.startRect;
    this.bar.clear();
    if (rect.contains(this.game.input.x, this.game.input.y)) {
      this.bar.beginFill(0x000000, 0.2);
      this.bar.drawRect(rect.x, rect.y, rect.width, rect.height);
    }
  }

  private drawText(x: number, y: number, message: string) {
    let style =  {
      font : "bold 22px Arial",
      fill : "#fff",
      wordWrap: true,
      wordWrapWidth: 650,
      boundsAlignH : "left",
      boundsAlignV : "middle"
    };
    let text = this.game.add.text(0, 0, message, style);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    text.setTextBounds(x, y, 700, 100);
  }
}
