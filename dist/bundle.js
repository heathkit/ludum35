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
	var base_level_ts_2 = __webpack_require__(/*! ./base-level.ts */ 4);
	var DrPhase = (function (_super) {
	    __extends(DrPhase, _super);
	    function DrPhase(width, height, game, name) {
	        _super.call(this, width, height, game, name);
	    }
	    return DrPhase;
	}(Phaser.Game));
	var game = new DrPhase(800, 600, Phaser.AUTO, 'game');
	game.state.add('MainMenu', main_menu_ts_1.MainMenu, true);
	game.state.add('Saturday', base_level_ts_1.SaturdayLevel, true);
	game.state.add('Sunday', base_level_ts_2.SundayLevel, true);
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
	    }
	    MainMenu.prototype.preload = function () {
	        this.game.load.spritesheet('player', 'assets/tiles/all_characters.png', 64, 64);
	    };
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
	        var water = this.game.add.sprite(50, 100, 'player');
	        water.frame = 1;
	        this.drawText(120, 80, "Press '1' to become water. As water, you can move around with the arrow keys, but you'll fall through grates and drains.");
	        var steam = this.game.add.sprite(50, 200, 'player');
	        steam.frame = 5;
	        this.drawText(120, 180, "Press '2' to become steam. Steam rises and is blown by fans.");
	        var ice = this.game.add.sprite(50, 300, 'player');
	        ice.frame = 0;
	        this.drawText(120, 280, "Press '3' to become ice. Ice falls fast and is also blown by fans.");
	        var rect = new Phaser.Rectangle(300, 450, 200, 100);
	        this.bar = this.game.add.graphics();
	        var style = {
	            font: "bold 46px Arial",
	            fill: "#0d3",
	            boundsAlignH: "center",
	            boundsAlignV: "middle"
	        };
	        var text = this.game.add.text(0, 0, "START", style);
	        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	        text.setTextBounds(rect.x, rect.y, rect.width, rect.height);
	        this.startRect = rect;
	        this.game.input.onDown.add(function (event) {
	            if (rect.contains(_this.game.input.x, _this.game.input.y)) {
	                _this.game.state.start('Sunday', true, false);
	            }
	        });
	    };
	    MainMenu.prototype.update = function () {
	        var rect = this.startRect;
	        this.bar.clear();
	        if (rect.contains(this.game.input.x, this.game.input.y)) {
	            this.bar.beginFill(0x000000, 0.2);
	            this.bar.drawRect(rect.x, rect.y, rect.width, rect.height);
	        }
	    };
	    MainMenu.prototype.drawText = function (x, y, message) {
	        var style = {
	            font: "bold 22px Arial",
	            fill: "#fff",
	            wordWrap: true,
	            wordWrapWidth: 650,
	            boundsAlignH: "left",
	            boundsAlignV: "middle"
	        };
	        var text = this.game.add.text(0, 0, message, style);
	        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	        text.setTextBounds(x, y, 700, 100);
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
	        // Character assets.
	        this.game.load.image('steam', 'assets/images/steam.png');
	        this.game.load.spritesheet('player', 'assets/tiles/all_characters.png', 64, 64);
	        // Level assets.
	        this.game.load.image('platforms', 'assets/tiles/platforms.png');
	        this.game.load.image('pipes', 'assets/tiles/all_pipes.png');
	        this.game.load.image('grates', 'assets/tiles/grates.png');
	        this.game.load.spritesheet('fans', 'assets/tiles/fans.png', 64, 64);
	    };
	    BaseLevel.prototype.init = function (mapName) { this.mapName = mapName; };
	    BaseLevel.prototype.create = function () {
	        var _this = this;
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);
	        this.game.physics.arcade.TILE_BIAS = 32;
	        this.game.stage.backgroundColor = "#a9f0ff";
	        // Possible fix for jittery sprites.
	        // See http://www.html5gamedevs.com/topic/15266-phaser-camera-jittering/
	        this.game.renderer.renderSession.roundPixels = true;
	        this.player = new player_ts_1.Player(this.game, this.map);
	        // Make the camera follow the sprite
	        this.game.camera.follow(this.player.sprite);
	        // Enable cursor keys so we can create some controls
	        this.cursors = this.game.input.keyboard.createCursorKeys();
	        var debugKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
	        debugKey.onDown.add(function () { _this.debug = !_this.debug; });
	        var quitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
	        quitKey.onDown.add(function () { _this.game.state.start('MainMenu'); });
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
	// Individual levels are subclasses of BaseLevel so we can override stuff
	// as needed.
	var SaturdayLevel = (function (_super) {
	    __extends(SaturdayLevel, _super);
	    function SaturdayLevel() {
	        _super.apply(this, arguments);
	    }
	    SaturdayLevel.prototype.preload = function () {
	        _super.prototype.preload.call(this);
	        this.game.load.tilemap('saturday_2', 'assets/saturday_2.json', null, Phaser.Tilemap.TILED_JSON);
	    };
	    SaturdayLevel.prototype.create = function () {
	        // TODO: Unfuck this bullshit.
	        LEFT_VENT_IDX = 4;
	        RIGHT_VENT_IDX = 6;
	        DUCT_IDX = 5;
	        this.map = new Map(this.game, 'saturday_2');
	        _super.prototype.create.call(this);
	    };
	    return SaturdayLevel;
	}(BaseLevel));
	exports.SaturdayLevel = SaturdayLevel;
	var SundayLevel = (function (_super) {
	    __extends(SundayLevel, _super);
	    function SundayLevel() {
	        _super.apply(this, arguments);
	    }
	    SundayLevel.prototype.preload = function () {
	        _super.prototype.preload.call(this);
	        this.game.load.tilemap('sunday', 'assets/sunday.json', null, Phaser.Tilemap.TILED_JSON);
	    };
	    SundayLevel.prototype.create = function () {
	        LEFT_VENT_IDX = 18;
	        DUCT_IDX = 19;
	        RIGHT_VENT_IDX = 20;
	        GRATE_IDX = 12;
	        LEFT_FAN_IDX = 7;
	        RIGHT_FAN_IDX = 9;
	        DRAIN_IDX = 14;
	        DRAIN_EXIT = new Phaser.Point(30, 8);
	        this.map = new Map(this.game, 'sunday');
	        _super.prototype.create.call(this);
	    };
	    return SundayLevel;
	}(BaseLevel));
	exports.SundayLevel = SundayLevel;
	// Indecies of special tiles in the tilemap.
	var LEFT_VENT_IDX;
	var RIGHT_VENT_IDX;
	var GRATE_IDX;
	var LEFT_FAN_IDX;
	var RIGHT_FAN_IDX;
	var DUCT_IDX;
	var DRAIN_IDX;
	var DRAIN_EXIT;
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
	        this.tileMap.addTilesetImage('platforms', 'platforms');
	        this.tileMap.addTilesetImage('grates', 'grates');
	        this.tileMap.addTilesetImage('pipes', 'pipes');
	        // Add the duct and platform layers.
	        this.ductLayer = this.tileMap.createLayer('ducts');
	        this.platformLayer = this.tileMap.createLayer('platforms');
	        // Load in the fans and start them spinning.
	        this.left_fans = this.game.add.group();
	        this.tileMap.createFromObjects('fans', LEFT_FAN_IDX, 'fans', 2, true, false, this.left_fans);
	        this.right_fans = this.game.add.group();
	        this.tileMap.createFromObjects('fans', RIGHT_FAN_IDX, 'fans', 0, true, false, this.right_fans);
	        // Set up animations for the fans.
	        this.left_fans.callAll('animations.add', 'animations', 'left_spin', [0, 1], 10, true);
	        this.left_fans.callAll('animations.play', 'animations', 'left_spin');
	        this.right_fans.callAll('animations.add', 'animations', 'right_spin', [2, 3], 10, true);
	        this.right_fans.callAll('animations.play', 'animations', 'right_spin');
	        // Before you can use the collide function you need to set what tiles can
	        // collide.
	        this.tileMap.setCollisionBetween(1, 100, true, 'platforms');
	        // Exclude non-vent tiles from collsion on the duct layer.
	        this.tileMap.setCollisionByExclusion([DUCT_IDX], true, 'ducts');
	        // Change the world size to match the size of this layer
	        this.platformLayer.resizeWorld();
	        this.tileMap.setTileIndexCallback([LEFT_VENT_IDX, RIGHT_VENT_IDX], this.onVentHit, this, 'ducts');
	        this.tileMap.setTileIndexCallback([DRAIN_IDX], this.onDrainHit, this, 'platforms');
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
	        // TODO Really, this is wrong. Instead, we should follow the duct until we
	        // hit the exit, moving the player sprite along the way.
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
	    // Callback triggered when a sprite collides with a drain.
	    Map.prototype.onDrainHit = function (sprite, tile) {
	        if ((Math.abs(sprite.x - tile.worldX) < 10) && this.drainCallback) {
	            var exitTile = this.tileMap.getTile(DRAIN_EXIT.x, DRAIN_EXIT.y, 'platforms', true);
	            this.drainCallback(new Phaser.Point(exitTile.worldX, exitTile.worldY));
	        }
	        return true;
	    };
	    Map.prototype.collidePlatforms = function (sprite, skipGrates) {
	        this.game.physics.arcade.collide(sprite, this.platformLayer, null, function (sprite, tile) {
	            if (skipGrates && tile.index == GRATE_IDX) {
	                return false;
	            }
	            return true;
	        });
	    };
	    Map.prototype.collideDucts = function (sprite) {
	        this.game.physics.arcade.collide(sprite, this.ductLayer);
	    };
	    Map.prototype.collideFans = function (sprite) {
	        // Fans will blow a sprite away from them if they're inline.
	        // Fans are only effective within 5 tiles.
	        var range = 5 * this.tileMap.tileWidth;
	        var fanCollisionLeft = new Phaser.Rectangle(sprite.x - range, sprite.y, range, sprite.height);
	        var fanCollisionRight = new Phaser.Rectangle(sprite.x + sprite.width, sprite.y, range, sprite.height);
	        // look to the right for fans blowing to the left.
	        this.left_fans.forEach(function (fan) {
	            var fanBox = new Phaser.Rectangle(fan.x, fan.y, fan.width, fan.height);
	            if (fanCollisionLeft.intersects(fanBox, 0.1)) {
	                var dist = Phaser.Point.distance(fan.worldPosition, sprite.worldPosition);
	                sprite.body.velocity.x += 1000 / dist;
	            }
	        }, null);
	        // and to the left for fans blowing to the right.
	        this.right_fans.forEach(function (fan) {
	            var fanBox = new Phaser.Rectangle(fan.x, fan.y, fan.width, fan.height);
	            if (fanCollisionRight.intersects(fanBox, 0.1)) {
	                var dist = Phaser.Point.distance(fan.worldPosition, sprite.worldPosition);
	                sprite.body.velocity.x -= 1000 / dist;
	            }
	        }, null);
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
	        this.sprite.animations.add('water', [1], 0, false);
	        this.sprite.animations.add('water_drain', [1, 2, 3], 8, false);
	        this.sprite.animations.add('ice', [0], 10, true);
	        this.waterState = new Water(this.sprite, this.map, this.game);
	        this.steamState = new Steam(this.sprite, this.map, this.game);
	        this.iceState = new Ice(this.sprite, this.map, this.game);
	        var waterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	        var steamKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	        var iceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
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
	    };
	    Player.prototype.update = function (cursors) {
	        this.currentState.update(cursors);
	        // Clamp velocity so we don't clip through platforms.
	        this.sprite.body.velocity.y =
	            Phaser.Math.clamp(this.sprite.body.velocity.y, -1000, 1000);
	        // Player dies when they fall off the level.
	        var floor = this.map.tileMap.heightInPixels - 10;
	        var feet = this.sprite.body.y + this.sprite.body.height;
	        if (feet > floor) {
	            console.log("You died");
	            window.alert("You died");
	            this.game.state.start(this.game.state.current);
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
	    CharacterState.prototype.disablePhysics = function () {
	        this.sprite.body.gravity.y = 0;
	        this.sprite.body.velocity.y = 0;
	        this.sprite.body.velocity.x = 0;
	    };
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
	        this.map.collidePlatforms(this.sprite, false);
	        this.map.collideFans(this.sprite);
	    };
	    return Ice;
	}(CharacterState));
	var Water = (function (_super) {
	    __extends(Water, _super);
	    function Water() {
	        _super.apply(this, arguments);
	    }
	    Water.prototype.init = function () {
	        var _this = this;
	        this.teleporting = false;
	        this.sprite.animations.play('water');
	        this.startPhysics();
	        this.map.drainCallback = function (to) { _this.teleportThroughDrain(to); };
	    };
	    Water.prototype.startPhysics = function () {
	        this.sprite.body.bounce.y = 0.2;
	        this.sprite.body.gravity.y = 1500;
	    };
	    Water.prototype.teleportThroughDrain = function (to) {
	        var _this = this;
	        if (this.teleporting) {
	            return;
	        }
	        console.log("Flowing through drain");
	        this.teleporting = true;
	        this.disablePhysics();
	        var anim = this.sprite.animations.getAnimation('water_drain');
	        var moveToExit = this.game.add.tween(this.sprite).to(to, 1000, Phaser.Easing.Cubic.In);
	        moveToExit.onComplete.add(function () {
	            _this.teleporting = false;
	            _this.startPhysics();
	            _this.sprite.animations.play("water");
	            _this.sprite.visible = true;
	            // Well, crap, ran out of time. If they make it to the drain, they won!
	            window.alert("You win! Dr.Phase escaped and will start his new life as a superhero!");
	            _this.game.state.start("MainMenu");
	        });
	        anim.onComplete.add(function () {
	            _this.sprite.visible = false;
	            moveToExit.start();
	        });
	        anim.play();
	    };
	    Water.prototype.update = function (cursors) {
	        // Make the sprite collide with the ground layer
	        this.map.collidePlatforms(this.sprite, true);
	        if (!this.teleporting && this.sprite.body.onFloor()) {
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
	        }
	    };
	    Water.prototype.cleanup = function () {
	        if (this.teleporting) {
	            return false;
	        }
	        this.map.drainCallback = undefined;
	        return true;
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
	            function (from, to) { _this.teleportThroughVent(from, to); };
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
	        this.sprite.body.gravity.y = -1000;
	    };
	    Steam.prototype.teleportThroughVent = function (from, to) {
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
	            this.map.collidePlatforms(this.sprite, true);
	            this.map.collideFans(this.sprite);
	        }
	    };
	    return Steam;
	}(CharacterState));


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map