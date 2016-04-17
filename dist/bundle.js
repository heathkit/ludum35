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
	var main_menu_ts_1 = __webpack_require__(/*! ./main-menu.ts */ 3);
	var base_level_ts_1 = __webpack_require__(/*! ./base-level.ts */ 4);
	var DrPhase = (function (_super) {
	    __extends(DrPhase, _super);
	    function DrPhase(width, height, game, name) {
	        _super.call(this, width, height, game, name);
	    }
	    return DrPhase;
	}(Phaser.Game));
	var game = new DrPhase(800, 600, Phaser.AUTO, 'game');
	game.state.add('MainMenu', main_menu_ts_1.MainMenu, true);
	game.state.add('Level', base_level_ts_1.BaseLevel, true);
	game.state.start('MainMenu');


/***/ },
/* 2 */
/*!*************************!*\
  !*** external "Phaser" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = Phaser;

/***/ },
/* 3 */
/*!**************************!*\
  !*** ./src/main-menu.ts ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Phaser = __webpack_require__(/*! phaser */ 2);
	var MainMenu = (function (_super) {
	    __extends(MainMenu, _super);
	    function MainMenu() {
	        _super.call(this);
	        this.selected = 0;
	        this.style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	        this.levels = [
	            'Friday Night',
	            'TBA',
	            'TBA',
	            'TBA',
	            'TBA',
	        ];
	    }
	    MainMenu.prototype.preload = function () {
	    };
	    MainMenu.prototype.create = function () {
	        var _this = this;
	        this.game.stage.backgroundColor = '#337799';
	        var titleStyle = { font: "bold 46px Arial", fill: "#d30", boundsAlignH: "center", boundsAlignV: "middle" };
	        var title = this.game.add.text(0, 0, "Dr. Phase!", titleStyle);
	        title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	        title.setTextBounds(0, 0, 800, 100);
	        this.bar = this.game.add.graphics();
	        for (var i = 0; i < this.levels.length; i++) {
	            this.drawText(this.levels[i], i);
	        }
	        ;
	        //Enable cursor keys so we can create some controls
	        this.cursors = this.game.input.keyboard.createCursorKeys();
	        this.game.input.onDown.add(function (event) {
	            var item = Math.floor((_this.game.input.y - 100) / 100);
	            if (item == 0) {
	                _this.game.state.start('Level', true, false, ['FridayNight']);
	            }
	            else {
	                console.log("Invalid level selected!");
	            }
	        });
	    };
	    MainMenu.prototype.update = function () {
	        this.selected = Math.floor((this.game.input.y - 100) / 100);
	        if (this.selected < 0) {
	            this.selected = 0;
	        }
	        this.bar.clear();
	        this.bar.beginFill(0x000000, 0.2);
	        this.bar.drawRect(0, (100 * this.selected) + 100, 800, 100);
	    };
	    MainMenu.prototype.drawText = function (name, pos) {
	        //  The Text is positioned at 0, 100
	        var text = this.game.add.text(0, 0, name, this.style);
	        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
	        var line = pos * 100 + 100;
	        text.setTextBounds(0, line, 800, 100);
	    };
	    return MainMenu;
	}(Phaser.State));
	exports.MainMenu = MainMenu;


/***/ },
/* 4 */
/*!***************************!*\
  !*** ./src/base-level.ts ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Phaser = __webpack_require__(/*! phaser */ 2);
	var player_ts_1 = __webpack_require__(/*! ./player.ts */ 5);
	var BaseLevel = (function (_super) {
	    __extends(BaseLevel, _super);
	    function BaseLevel() {
	        _super.call(this);
	        this.debug = false;
	    }
	    BaseLevel.prototype.init = function () {
	    };
	    BaseLevel.prototype.preload = function () {
	        this.game.load.spritesheet('dude', 'assets/images/dude.png', 42, 64);
	        this.game.load.tilemap('tilemap', 'assets/saturday_2.json', null, Phaser.Tilemap.TILED_JSON);
	        this.game.load.image('tiles', 'assets/tiles/saturday_roughfile.png');
	    };
	    BaseLevel.prototype.create = function () {
	        var _this = this;
	        //Start the Arcade Physics systems
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	        //Change the background colour
	        this.game.stage.backgroundColor = "#a9f0ff";
	        //Add the tilemap and tileset image. The first parameter in addTilesetImage
	        //is the name you gave the tilesheet when importing it into Tiled, the second
	        //is the key to the asset in Phaser
	        this.map = this.game.add.tilemap('tilemap');
	        this.map.addTilesetImage('platforms_ducts', 'tiles');
	        //Add both the background and ground layers. We won't be doing anything with the
	        //GroundLayer though
	        //this.backgroundLayer = this.map.createLayer('BackgroundLayer');
	        this.platformLayer = this.map.createLayer('platforms');
	        // Scales the layer, but the sprite ends up clipped.
	        //this.groundLayer.setScale(0.6,0.6);
	        //Before you can use the collide function you need to set what tiles can collide
	        this.map.setCollisionBetween(1, 100, true, 'platforms');
	        // Create custom collision boxes for the platforms.
	        console.log(this.map.layers);
	        this.player = new player_ts_1.Player(this.game);
	        //Change the world size to match the size of this layer
	        this.platformLayer.resizeWorld();
	        //Make the camera follow the sprite
	        this.game.camera.follow(this.player.sprite);
	        //Enable cursor keys so we can create some controls
	        this.cursors = this.game.input.keyboard.createCursorKeys();
	        var debugKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
	        debugKey.onDown.add(function () { _this.debug = !_this.debug; });
	    };
	    BaseLevel.prototype.update = function () {
	        //Make the sprite collide with the ground layer
	        this.game.physics.arcade.collide(this.player.sprite, this.platformLayer);
	        this.player.update(this.cursors);
	        if (this.debug) {
	            this.game.debug.spriteInfo(this.player.sprite, 32, 32);
	        }
	    };
	    BaseLevel.prototype.render = function () {
	        // Enable debugging for player body.
	        if (this.debug) {
	            this.game.debug.body(this.player.sprite);
	        }
	    };
	    return BaseLevel;
	}(Phaser.State));
	exports.BaseLevel = BaseLevel;


/***/ },
/* 5 */
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ function(module, exports) {

	"use strict";
	var Player = (function () {
	    function Player(game) {
	        //Add the sprite to the game and enable arcade physics on it
	        this.sprite = game.add.sprite(10, 0, 'dude');
	        game.physics.arcade.enable(this.sprite);
	        this.sprite.body.setSize(42, 56, 0, 0);
	        this.sprite.debug = true;
	        //Set some physics on the sprite
	        this.sprite.body.bounce.y = 0.2;
	        this.sprite.body.gravity.y = 2000;
	        this.sprite.body.collideWorldBounds = true;
	        //Create a running animation for the sprite and play it
	        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	        this.sprite.animations.add('left', [1, 2, 3, 4], 10, true);
	    }
	    Player.prototype.update = function (cursors) {
	        //Make the sprite jump when the up key is pushed
	        if (cursors.up.isDown) {
	            this.sprite.body.velocity.y = -500;
	        }
	        else if (cursors.left.isDown) {
	            this.sprite.body.velocity.x = -500;
	            this.sprite.animations.play('left');
	        }
	        else if (cursors.right.isDown) {
	            this.sprite.body.velocity.x = 500;
	            this.sprite.animations.play('right');
	        }
	        else {
	            this.sprite.body.velocity.x = 0;
	            this.sprite.animations.stop();
	        }
	        // TODO: Remove this hack for falling through the floor.
	        if (this.sprite.y > 670) {
	            this.sprite.y = 600;
	            this.sprite.body.velocity.x = 0;
	        }
	        this.sprite.debug = true;
	    };
	    return Player;
	}());
	exports.Player = Player;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map