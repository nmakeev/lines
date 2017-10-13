import * as PIXI from 'pixi.js';

import { SPRITE_ID, resourcePaths } from '../resources.js';

import ModalBox from './modalBox';
import LabelButton from '../control/labelButton';
import Utils from '../utils';

export default class GameOverBox extends ModalBox {

    constructor(score) {
        super();
        this.score = score;
        
        this.createTitle();
        this.createScoreField();
        this.createNewGameButton();
    }
    
    createTitle() {
        let title = this.title = new PIXI.Text('NO MORE MOVES', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '50px'
        }));
        
        this.addChild(title);
        
        Utils.centerX(this, title);        
        title.y = 40;
    }
    
    createScoreField() {
        let scoreField = this.scoreField = new PIXI.Text('SCORE ' + this.score, new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '36px'
        }));
        this.addChild(scoreField);
        
        Utils.centerX(this, scoreField);        
        scoreField.y = this.title.y + this.title.height + 20;
    }
    
    createNewGameButton() {
        let newGameButton = LabelButton.create(PIXI.loader.resources[SPRITE_ID], 'longButton', 'NEW GAME', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '26px'
        }));
        this.addChild(newGameButton);
        
        Utils.centerX(this, newGameButton);
        newGameButton.y = this.height - newGameButton.height - 50;
        
        newGameButton.once('pointerdown', this.newGameClickHandler, this);
    }
    
    newGameClickHandler() {
        this.emit('newgameclick');
        this.close();
    }
}