import { SPRITE_ID, resourcePaths } from '../resources.js';

import GameModeButton from '../control/gameModeButton';
import GameScene from './gameScene';
import Scene from './scene';
import Utils from '../utils';

import * as GameMode from '../model/gameMode';

export default class GameModeScene extends Scene {
    
    init(context) {
        super.init(context);
        
        this.createTitle();
        this.createButtons();
    }
    
    createTitle() {
        let title = new PIXI.Text('GAME MODE', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '50px'
        }));
        this.addChild(title);
        
        this.titleSpaceHeight = 150;
        
        Utils.centerX(this.context.app.renderer, title);
        title.y = Math.floor((this.titleSpaceHeight - title.height) / 2);
    }
    
    createButtons() {
        this.posY = this.titleSpaceHeight;
        this.createLinesButton();
        this.createBlocksButton();
        this.createSnakesButton();
    }
    
    createLinesButton() {
        let linesButton = this.linesButton = GameModeButton.create(PIXI.loader.resources[SPRITE_ID], 'modeButton', 'linesLogo', 'LINES', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '26px'
        }));
        this.addChild(linesButton);
        
        Utils.centerX(this.context.app.renderer, linesButton);
        linesButton.y = this.posY;
        
        linesButton.once('pointerdown', this.linesButtonClickHandler, this);
        
        this.posY += linesButton.height + 30;
    }
    
    createBlocksButton() {
        let blocksButton = this.blocksButton = GameModeButton.create(PIXI.loader.resources[SPRITE_ID], 'modeButton', 'blocksLogo', 'BLOCKS', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '26px'
        }));
        this.addChild(blocksButton);
        
        blocksButton.x = this.linesButton.x;
        blocksButton.y = this.posY;
        
        blocksButton.once('pointerdown', this.blocksButtonClickHandler, this);
        
        this.posY += blocksButton.height + 30;
    }
    
    createSnakesButton() {
        let snakesButton = this.snakesButton = GameModeButton.create(PIXI.loader.resources[SPRITE_ID], 'modeButton', 'snakesLogo', 'SNAKES', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '26px'
        }));
        this.addChild(snakesButton);
        
        snakesButton.x = this.linesButton.x;
        snakesButton.y = this.posY;
        
        snakesButton.once('pointerdown', this.snakesButtonClickHandler, this);
    }
    
    linesButtonClickHandler() {
        this.runGame(GameMode.LINES);
    }
    
    blocksButtonClickHandler() {
        this.runGame(GameMode.BLOCKS);
    }
    
    snakesButtonClickHandler() {
        this.runGame(GameMode.SNAKES);
    }
    
    runGame(gameMode) {        
        this.context.sceneManager.setCurrentScene(new GameScene(gameMode));
    }
}