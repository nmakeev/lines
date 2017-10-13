import Game from './game';
import * as PIXI from 'pixi.js';

import { SPRITE_ID, resourcePaths } from './resources';

import WebFont from 'webfontloader';

let spritesReady = false,
    fontsReady = false;
    
let runGame = () => {
    let game = new Game('container');
    game.init();
}

let checkReady = () => {
    if (!spritesReady || !fontsReady) {
        return;
    }
    
    runGame();
}

//let WebFont = require('webfontloader');
WebFont.load({
  active: () => {
    fontsReady = true;
    checkReady();
  },
  custom: {
    families: ['Corbert'],
    urls: ['./css/font.css']
} 
});

for (let key in resourcePaths) {
    let resourcePath = resourcePaths[key];
    PIXI.loader.add(key, resourcePath);    
}

PIXI.loader.load(() => {
    spritesReady = true;
    checkReady();
});

