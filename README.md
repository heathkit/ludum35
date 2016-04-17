# Phase Change Man!

Entry for Ludum Dare 35.

[Live Demo](http://mgiambalvo.github.io/ludum35/)

## Overview

You play phase change man! Through the power of super science, he can take the form of
water, a cloud, or a rock. He'll need these extraordinary abilities, because sadly he
cannot jump or fall very far.

You can't hold a given form indefinately. Holding a form depletes energy, which needs to
recharge. (Possibly add an item to give you energy)

### Gas form
- Causes you to rise to the top of the level
- can be sucked into ventilation ducts
- will be blown about by fans
- can rise through floor grates

### Liquid form
- will fall to the bottom of the map
- flows through drains and pipes
- falls through floor grates

## Ice (or block?) form
- indestructible
- will slide around along the floor
- will smash through certain floor tiles when falling

## TODO
- get information about the current tile and apply level effects
- changing forms

## Phaser stuff
Camera deadzone: http://phaser.io/examples/v2/camera/deadzone

## Setup

Local development is done with webpack and BrowerSync. To get started, run the following:

```sh
npm install
typings install
webpack
```

This will start a dev server on port 3000.

## Publishing
Run `gulp deploy` to publish to github pages.
