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
	        this.style = {
	            font: "bold 32px Arial",
	            fill: "#fff",
	            boundsAlignH: "center",
	            boundsAlignV: "middle"
	        };
	        this.levels = [
	            'Friday Night',
	            'TBA',
	            'TBA',
	            'TBA',
	            'TBA',
	        ];
	    }
	    MainMenu.prototype.preload = function () { };
	    MainMenu.prototype.create = function () {
	        var _this = this;
	        this.game.stage.backgroundColor = '#337799';
	        var titleStyle = {
	            font: "bold 46px Arial",
	            fill: "#d30",
	            boundsAlignH: "center",
	            boundsAlignV: "middle"
	        };
	        var title = this.game.add.text(0, 0, "Dr. Phase!", titleStyle);
	        title.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	        title.setTextBounds(0, 0, 800, 100);
	        this.bar = this.game.add.graphics();
	        for (var i = 0; i < this.levels.length; i++) {
	            this.drawText(this.levels[i], i);
	        }
	        ;
	        // Enable cursor keys so we can create some controls
	        this.cursors = this.game.input.keyboard.createCursorKeys();
	        this.game.input.onDown.add(function (event) {
	            var item = Math.floor((_this.game.input.y - 100) / 100);
	            if (item == 0) {
	                _this.game.state.start('Level', true, false, ['saturday_2']);
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
	    BaseLevel.prototype.preload = function () {
	        this.game.load.spritesheet('player', 'assets/tiles/cloud_water.png', 64, 64);
	        this.game.load.tilemap('saturday_2', 'assets/saturday_2.json', null, Phaser.Tilemap.TILED_JSON);
	        this.game.load.image('tiles', 'assets/tiles/saturday_roughfile.png');
	    };
	    BaseLevel.prototype.init = function (mapName) { this.mapName = mapName; };
	    BaseLevel.prototype.create = function () {
	        var _this = this;
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	        this.game.stage.backgroundColor = "#a9f0ff";
	        this.map = new Map(this.game, this.mapName);
	        this.player = new player_ts_1.Player(this.game, this.map);
	        // Make the camera follow the sprite
	        this.game.camera.follow(this.player.sprite);
	        // Enable cursor keys so we can create some controls
	        this.cursors = this.game.input.keyboard.createCursorKeys();
	        var debugKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
	        debugKey.onDown.add(function () { _this.debug = !_this.debug; });
	    };
	    BaseLevel.prototype.update = function () {
	        // TODO Instead of passing this directly, allow touch or keyboard input.
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
	var Map = (function () {
	    function Map(game, mapName) {
	        // Add the tilemap and tileset image. The first parameter in addTilesetImage
	        // is the name you gave the tilesheet when importing it into Tiled, the
	        // second
	        // is the key to the asset in Phaser
	        this.tileMap = game.add.tilemap(mapName);
	        this.tileMap.addTilesetImage('platforms_ducts', 'tiles');
	        // Add both the background and ground layers. We won't be doing anything
	        // with the
	        // GroundLayer though
	        this.ductLayer = this.tileMap.createLayer('ducts');
	        this.platformLayer = this.tileMap.createLayer('platforms');
	        // Before you can use the collide function you need to set what tiles can
	        // collide
	        this.tileMap.setCollisionBetween(1, 100, true, 'platforms');
	        // Change the world size to match the size of this layer
	        this.platformLayer.resizeWorld();
	        this.makePlatformsOneWay();
	    }
	    // Example of how to work with the tilemap to change collision behavior.
	    Map.prototype.makePlatformsOneWay = function () {
	        var d = this.tileMap.layers[this.platformLayer.index].data;
	        console.log(d);
	        for (var row = 0; row < d.length; row++) {
	            for (var col = 0; col < d[row].length; col++) {
	                if (d[row][col].index > 0) {
	                    d[row][col].collideDown = false;
	                    d[row][col].collideLeft = false;
	                    d[row][col].collideRight = false;
	                }
	            }
	        }
	    };
	    return Map;
	}());
	exports.Map = Map;


/***/ },
/* 5 */
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Phaser = __webpack_require__(/*! phaser */ 2);
	var Player = (function () {
	    function Player(game, map) {
	        var _this = this;
	        this.game = game;
	        this.map = map;
	        // Add the sprite to the game and enable arcade physics on it
	        this.sprite = game.add.sprite(10, 0, 'player');
	        this.game.physics.arcade.enable(this.sprite);
	        this.sprite.body.setSize(48, 56, 8, 0);
	        this.sprite.debug = true;
	        // Set some physics on the sprite
	        this.sprite.body.collideWorldBounds = true;
	        // The different characters are different frames in the same spritesheet.
	        this.sprite.animations.add('steam', [0, 1, 2, 1], 7, true);
	        this.sprite.animations.add('water', [3], 10, true);
	        this.waterState = new Water(this.sprite, this.map);
	        this.steamState = new Steam(this.sprite, this.map);
	        var dudeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	        var waterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	        var steamKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	        // dudeKey.onDown.add(() => {this.changeState()});
	        waterKey.onDown.add(function () { _this.changeState(_this.waterState); });
	        steamKey.onDown.add(function () { _this.changeState(_this.steamState); });
	        // Start as water.
	        this.changeState(this.waterState);
	    }
	    Player.prototype.changeState = function (newState) {
	        newState.init();
	        this.currentState = newState;
	        console.log("Becoming state ", newState);
	    };
	    Player.prototype.update = function (cursors) {
	        // Make the sprite collide with the ground layer
	        this.game.physics.arcade.collide(this.sprite, this.map.platformLayer);
	        this.currentState.update(cursors);
	        // Clamp velocity so we don't clip through platforms.
	        this.sprite.body.velocity.y = Phaser.Math.clamp(this.sprite.body.velocity.y, -750, 750);
	        // TODO: Determine bottom of the level from the map.
	        if (this.sprite.y > 670) {
	            this.sprite.y = 650;
	            this.sprite.body.velocity.x = 0;
	        }
	    };
	    return Player;
	}());
	exports.Player = Player;
	var CharacterState = (function () {
	    function CharacterState(sprite, map) {
	        this.sprite = sprite;
	        this.map = map;
	    }
	    CharacterState.prototype.init = function () { console.log("Init unimplemented"); };
	    CharacterState.prototype.update = function (cursors) { console.log("Update unimplemented"); };
	    return CharacterState;
	}());
	var Water = (function (_super) {
	    __extends(Water, _super);
	    function Water() {
	        _super.apply(this, arguments);
	    }
	    Water.prototype.init = function () {
	        this.sprite.animations.play('water');
	        this.sprite.body.bounce.y = 0.2;
	        this.sprite.body.gravity.y = 2000;
	    };
	    Water.prototype.update = function (cursors) {
	        // Water can slide around.
	        if (cursors.left.isDown) {
	            this.sprite.body.velocity.x = -500;
	        }
	        else if (cursors.right.isDown) {
	            this.sprite.body.velocity.x = 500;
	        }
	        else {
	            this.sprite.body.velocity.x = 0;
	        }
	    };
	    return Water;
	}(CharacterState));
	var Steam = (function (_super) {
	    __extends(Steam, _super);
	    function Steam() {
	        _super.apply(this, arguments);
	    }
	    Steam.prototype.init = function () {
	        this.sprite.animations
	            .play("steam");
	        this.sprite.body.bounce.y = 0.4;
	        this.sprite.body.gravity.y = -2000;
	    };
	    Steam.prototype.update = function (cursors) {
	        // Steam just rises.
	        // If we pass by a vent, get sucked into the ducts.
	    };
	    return Steam;
	}(CharacterState));


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map