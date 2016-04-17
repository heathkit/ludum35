import * as Phaser from 'phaser';

export class MainMenu extends Phaser.State {

  bar: Phaser.Graphics;
  cursors: Phaser.CursorKeys;
  style: Phaser.PhaserTextStyle;

  levels: string[];
  selected: number = 0;

  constructor() {
    super();
    this.style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    this.levels = [
        'Friday Night',
        'TBA',
        'TBA',
        'TBA',
        'TBA',
    ];
  }

  preload() {
  }

  create() {
    this.game.stage.backgroundColor = '#337799';

    let titleStyle = { font: "bold 46px Arial", fill: "#d30", boundsAlignH: "center", boundsAlignV: "middle" };
    let title = this.game.add.text(0, 0, "Dr. Phase!", titleStyle);
    title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    title.setTextBounds(0, 0, 800, 100);

    this.bar = this.game.add.graphics();
    for (let i = 0; i < this.levels.length; i++) {
        this.drawText(this.levels[i], i);
    };

    //Enable cursor keys so we can create some controls
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.input.onDown.add((event) => {
      let item = Math.floor((this.game.input.y - 100)/100);
      if (item == 0 ) {
        this.game.state.start('Level', true, false, ['saturday_2']);
      } else {
        console.log("Invalid level selected!")  ;
      }
    });
  }

  update() {
    this.selected = Math.floor((this.game.input.y - 100)/100);
    if (this.selected < 0) {
      this.selected = 0;
    }

    this.bar.clear();
    this.bar.beginFill(0x000000, 0.2);
    this.bar.drawRect(0, (100*this.selected) + 100, 800, 100);
  }


  private drawText(name: string, pos: number) {
    //  The Text is positioned at 0, 100
    let text = this.game.add.text(0, 0, name, this.style);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
    let line = pos*100 + 100;
    text.setTextBounds(0, line, 800, 100);
  }
}
