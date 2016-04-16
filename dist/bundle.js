/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** multi app ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! /Users/heathkit/src/ludum35/src/index.ts */1);


/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../typings/browser.d.ts"/>
	/// <reference path="../public/lib/phaser.d.ts"/>
	var Phaser = __webpack_require__(/*! phaser */ 2);
	var PhaseChangeGame = (function (_super) {
	    __extends(PhaseChangeGame, _super);
	    function PhaseChangeGame() {
	        _super.call(this);
	    }
	    PhaseChangeGame.prototype.init = function () {
	    };
	    PhaseChangeGame.prototype.preload = function () {
	        this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
	        this.game.load.tilemap('tilemap', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
	        this.game.load.image('tiles', 'assets/images/desert_tilesheet.png');
	    };
	    PhaseChangeGame.prototype.create = function () {
	        //Change the background colour
	        this.game.stage.backgroundColor = "#a9f0ff";
	        //Add the tilemap and tileset image. The first parameter in addTilesetImage
	        //is the name you gave the tilesheet when importing it into Tiled, the second
	        //is the key to the asset in Phaser
	        this.map = this.game.add.tilemap('tilemap');
	        this.map.addTilesetImage('Desert', 'tiles');
	        //Add both the background and ground layers. We won't be doing anything with the
	        //GroundLayer though
	        //this.backgroundLayer = this.map.createLayer('BackgroundLayer');
	        this.groundLayer = this.map.createLayer('GroundLayer');
	        this.groundLayer.debug = true;
	        //this.groundLayer.setScale(0.75,0.75);
	        //Before you can use the collide function you need to set what tiles can collide
	        this.map.setCollisionBetween(1, 100, true, 'GroundLayer');
	        //Add the sprite to the game and enable arcade physics on it
	        this.sprite = this.game.add.sprite(10, 0, 'dude');
	        this.game.physics.arcade.enable(this.sprite);
	        //Change the world size to match the size of this layer
	        this.groundLayer.resizeWorld();
	        //Set some physics on the sprite
	        this.sprite.body.bounce.y = 0.2;
	        this.sprite.body.gravity.y = 2000;
	        this.sprite.body.gravity.x = 20;
	        this.sprite.body.velocity.x = 100;
	        //Create a running animation for the sprite and play it
	        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	        this.sprite.animations.play('right');
	        //Make the camera follow the sprite
	        this.game.camera.follow(this.sprite);
	        //Enable cursor keys so we can create some controls
	        this.cursors = this.game.input.keyboard.createCursorKeys();
	        //Start the Arcade Physics systems
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    };
	    PhaseChangeGame.prototype.update = function () {
	        //Make the sprite collide with the ground layer
	        this.game.physics.arcade.collide(this.sprite, this.groundLayer);
	        //Make the sprite jump when the up key is pushed
	        if (this.cursors.up.isDown) {
	            this.sprite.body.velocity.y = -500;
	        }
	    };
	    return PhaseChangeGame;
	}(Phaser.State));
	var game = new Phaser.Game(640, 400, Phaser.AUTO, 'game');
	game.state.add('Game', PhaseChangeGame, true);


/***/ },
/* 2 */
/*!*************************!*\
  !*** external "Phaser" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = Phaser;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map