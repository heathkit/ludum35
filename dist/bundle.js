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
	        this.game.load.image('steam', 'assets/images/steam.png');
	        this.game.load.spritesheet('player', 'assets/tiles/all_characters.png', 64, 64);
	        this.game.load.image('tiles', 'assets/tiles/platforms.png');
	        this.game.load.image('pipes', 'assets/tiles/all_pipes.png');
	        this.game.load.image('fans', 'assets/tiles/fans.png');
	        this.game.load.tilemap('saturday_2', 'assets/saturday_2.json', null, Phaser.Tilemap.TILED_JSON);
	    };
	    BaseLevel.prototype.init = function (mapName) { this.mapName = mapName; };
	    BaseLevel.prototype.create = function () {
	        var _this = this;
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	        this.game.stage.backgroundColor = "#a9f0ff";
	        // Possible fix for jittery sprites.
	        // See http://www.html5gamedevs.com/topic/15266-phaser-camera-jittering/
	        this.game.renderer.renderSession.roundPixels = true;
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
	// TODO: Represent levels as sub classes of baselevel so we have an easy
	// way to hand code level-specific logic.
	var SaturdayLevel = (function (_super) {
	    __extends(SaturdayLevel, _super);
	    function SaturdayLevel() {
	        _super.apply(this, arguments);
	    }
	    SaturdayLevel.prototype.preload = function () {
	        _super.prototype.preload.call(this);
	        this.game.load.tilemap('saturday_2', 'assets/saturday_2.json', null, Phaser.Tilemap.TILED_JSON);
	    };
	    return SaturdayLevel;
	}(BaseLevel));
	// Indecies of special tiles in the tilemap.
	var LEFT_VENT_IDX = 4;
	var RIGHT_VENT_IDX = 6;
	var Map = (function () {
	    function Map(game, mapName) {
	        this.overVent = false;
	        this.game = game;
	        // Cheat so we can send vent events at the start of the game.
	        this.lastVentEventSent = -10;
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
	        // Exclude pipe tiles from collsion on the duct layer.
	        this.tileMap.setCollisionByExclusion([5], true, 'ducts');
	        // Change the world size to match the size of this layer
	        this.platformLayer.resizeWorld();
	        this.tileMap.setTileIndexCallback([LEFT_VENT_IDX, RIGHT_VENT_IDX], this.onVentHit, this, 'ducts');
	    }
	    // Callback triggered when a sprite collides with a vent.
	    Map.prototype.onVentHit = function (sprite, tile) {
	        // Only register the collision if we have a callback.
	        if (this.ventCallback) {
	            // Debounce this event.
	            var elapsedSinceLastEvent = this.game.time.totalElapsedSeconds() - this.lastVentEventSent;
	            // This delay is set to give us time to exit the vent after getting
	            // sucked through it. A better way would be to have the ventCallback
	            // return whether we should respect collisions.
	            if (elapsedSinceLastEvent >= 4) {
	                // Send a callback with the enter and exit points.
	                var height = tile.height / 2 - 20;
	                var width = tile.width / 2;
	                var from = new Phaser.Point(tile.worldX + width, tile.worldY + height);
	                var otherVent = this.getOtherVent(tile);
	                var to = new Phaser.Point(otherVent.worldX + width, otherVent.worldY + height);
	                this.ventCallback(from, to);
	                this.lastVentEventSent = this.game.time.totalElapsedSeconds();
	            }
	            return true;
	        }
	        return false;
	    };
	    // Given a vent tile, find the other vent tile in this map.
	    Map.prototype.getOtherVent = function (tile) {
	        var exitType = LEFT_VENT_IDX;
	        if (tile.index == LEFT_VENT_IDX) {
	            exitType = RIGHT_VENT_IDX;
	        }
	        var d = this.tileMap.layers[this.ductLayer.index].data;
	        console.log(d);
	        for (var row = 0; row < d.length; row++) {
	            for (var col = 0; col < d[row].length; col++) {
	                if (d[row][col].index == exitType) {
	                    return d[row][col];
	                }
	            }
	        }
	    };
	    Map.prototype.collidePlatforms = function (sprite) {
	        this.game.physics.arcade.collide(sprite, this.platformLayer);
	    };
	    Map.prototype.collideDucts = function (sprite) {
	        this.game.physics.arcade.collide(sprite, this.ductLayer);
	    };
	    // Example of how to work with the tilemap to change collision behavior.
	    // No longer used, but it shows how to search through the tile map.
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
	        this.sprite = game.add.sprite(10, 500, 'player');
	        this.game.physics.arcade.enable(this.sprite);
	        this.sprite.body.setSize(48, 48, 8, 6);
	        this.sprite.debug = true;
	        // Set some physics on the sprite
	        this.sprite.body.collideWorldBounds = true;
	        // The different characters are different frames in the same spritesheet.
	        this.sprite.animations.add('steam', [5, 6, 7, 6], 7, true);
	        this.sprite.animations.add('water', [1, 2, 3], 1, true);
	        this.sprite.animations.add('ice', [0], 10, true);
	        this.waterState = new Water(this.sprite, this.map, this.game);
	        this.steamState = new Steam(this.sprite, this.map, this.game);
	        this.iceState = new Ice(this.sprite, this.map, this.game);
	        var waterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	        var steamKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	        var iceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	        // dudeKey.onDown.add(() => {this.changeState()});
	        waterKey.onDown.add(function () { _this.changeState(_this.waterState); });
	        steamKey.onDown.add(function () { _this.changeState(_this.steamState); });
	        iceKey.onDown.add(function () { _this.changeState(_this.iceState); });
	        // Start as water.
	        this.changeState(this.waterState);
	    }
	    Player.prototype.changeState = function (newState) {
	        if (this.currentState) {
	            if (!this.currentState.cleanup()) {
	                console.log("Not allowed to change state!");
	                return;
	            }
	        }
	        newState.init();
	        this.currentState = newState;
	        console.log("Becoming state ", newState);
	    };
	    Player.prototype.update = function (cursors) {
	        this.currentState.update(cursors);
	        // Clamp velocity so we don't clip through platforms.
	        this.sprite.body.velocity.y =
	            Phaser.Math.clamp(this.sprite.body.velocity.y, -1500, 1500);
	        // TODO: Determine bottom of the level from the map.
	        var floor = this.map.tileMap.heightInPixels - this.map.tileMap.tileHeight;
	        var feet = this.sprite.body.y + this.sprite.body.height;
	        if (feet > (floor)) {
	            console.log("Broke through floor ", feet, floor);
	            this.sprite.body.y = floor - this.sprite.height;
	            this.sprite.body.velocity.y = 0;
	        }
	    };
	    return Player;
	}());
	exports.Player = Player;
	var CharacterState = (function () {
	    function CharacterState(sprite, map, game) {
	        this.sprite = sprite;
	        this.map = map;
	        this.game = game;
	    }
	    CharacterState.prototype.init = function () { console.log("Init unimplemented"); };
	    CharacterState.prototype.update = function (cursors) { console.log("Update unimplemented"); };
	    // Clean up the state before switching. Will
	    // return false if the state does not allow switching.
	    CharacterState.prototype.cleanup = function () { return true; };
	    return CharacterState;
	}());
	var Ice = (function (_super) {
	    __extends(Ice, _super);
	    function Ice() {
	        _super.apply(this, arguments);
	    }
	    Ice.prototype.init = function () {
	        this.sprite.animations.play('ice');
	        this.sprite.body.bounce.y = 0;
	        this.sprite.body.gravity.y = 4000;
	    };
	    Ice.prototype.update = function (cursors) {
	        // Ice collides with platforms but cannot be controlled.
	        this.map.collidePlatforms(this.sprite);
	    };
	    return Ice;
	}(CharacterState));
	var Water = (function (_super) {
	    __extends(Water, _super);
	    function Water() {
	        _super.apply(this, arguments);
	    }
	    Water.prototype.init = function () {
	        this.sprite.animations.play('water');
	        this.sprite.body.bounce.y = 0.2;
	        this.sprite.body.gravity.y = 1500;
	    };
	    Water.prototype.update = function (cursors) {
	        // Make the sprite collide with the ground layer
	        this.map.collidePlatforms(this.sprite);
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
	    function Steam(sprite, map, game) {
	        _super.call(this, sprite, map, game);
	        this.makeSteamTrail();
	    }
	    Steam.prototype.init = function () {
	        var _this = this;
	        this.lastExitVent = 0;
	        this.teleporting = false;
	        this.sprite.animations.play("steam");
	        this.startPhysics();
	        this.map.ventCallback =
	            function (from, to) { _this.teleportThroughPipe(from, to); };
	    };
	    Steam.prototype.makeSteamTrail = function () {
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
	    };
	    Steam.prototype.startPhysics = function () {
	        this.sprite.body.bounce.y = 0.4;
	        this.sprite.body.gravity.y = -2000;
	    };
	    Steam.prototype.disablePhysics = function () {
	        this.sprite.body.gravity.y = 0;
	        this.sprite.body.velocity.y = 0;
	        this.sprite.body.velocity.x = 0;
	    };
	    Steam.prototype.teleportThroughPipe = function (from, to) {
	        var _this = this;
	        this.teleporting = true;
	        this.disablePhysics();
	        console.log("Teleport from ", from, to);
	        var shrink = this.game.add.tween(this.sprite.scale)
	            .to({ x: 0.1, y: 0.1 }, 500, Phaser.Easing.Cubic.In);
	        var expand = this.game.add.tween(this.sprite.scale)
	            .to({ x: 1, y: 1 }, 500, Phaser.Easing.Cubic.Out);
	        var enterVent = this.game.add.tween(this.sprite).to(from, 500, Phaser.Easing.Cubic.In);
	        var moveToExit = this.game.add.tween(this.sprite).to(to, 1000, Phaser.Easing.Cubic.In);
	        enterVent.chain(moveToExit);
	        enterVent.onStart.add(function () { shrink.start(); });
	        // Hide the sprite during teleport
	        moveToExit.onStart.add(function () {
	            _this.emitter.on = true;
	            _this.sprite.visible = false;
	        });
	        moveToExit.onComplete.add(function () {
	            _this.emitter.on = false;
	            _this.sprite.visible = true;
	        });
	        moveToExit.chain(expand);
	        expand.onComplete.add(function () {
	            console.log("Teleport done");
	            _this.teleporting = false;
	            _this.startPhysics();
	        });
	        enterVent.start();
	    };
	    Steam.prototype.cleanup = function () {
	        if (this.teleporting) {
	            return false;
	        }
	        this.map.ventCallback = undefined;
	        return true;
	    };
	    Steam.prototype.update = function (cursors) {
	        // Steam just rises uncontrollably.
	        this.emitter.emitX = this.sprite.x;
	        this.emitter.emitY = this.sprite.y;
	        // Ignore collisions during teleport.
	        if (!this.teleporting) {
	            this.map.collideDucts(this.sprite);
	        }
	    };
	    return Steam;
	}(CharacterState));


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map