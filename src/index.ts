/// <reference path="../typings/browser.d.ts"/>
/// <reference path="../public/lib/phaser.d.ts"/>
import * as Phaser from 'phaser';
import {MainMenu} from './main-menu.ts';
import {SaturdayLevel} from './base-level.ts';
import {SundayLevel} from './base-level.ts';

class DrPhase extends Phaser.Game {
  constructor(width, height, game, name) { super(width, height, game, name); }
}

var game = new DrPhase(800, 600, Phaser.AUTO, 'game');
game.state.add('MainMenu', MainMenu, true);
game.state.add('Saturday', SaturdayLevel, true);
game.state.add('Sunday', SundayLevel, true);
game.state.start('MainMenu');
