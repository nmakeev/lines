import Scene from './scene';
import GameModeScene from './gameModeScene';
import LabelButton from '../control/labelButton';
import Utils from '../utils';

import { SPRITE_ID, resourcePaths } from '../resources.js';

export default class MenuScene extends Scene {
    
    init(context) {
        super.init(context);
        
        this.createLogo();
        this.createMenu();
    }
    
    createLogo() {
        let headContainer = new PIXI.Container();
        this.addChild(headContainer);
                
        let logo = new PIXI.Sprite(
            PIXI.loader.resources[SPRITE_ID].textures['logo']
        );        
        headContainer.addChild(logo);
        
        let title = new PIXI.Text('LINES', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '92px'
        }));        
        title.x = logo.x + logo.width + 20;
        
        headContainer.addChild(title);  

        Utils.centerX(this.context.app.renderer, headContainer);        
        headContainer.y = 150;
    }
    
    createMenu() {
        let playButton = LabelButton.create(PIXI.loader.resources[SPRITE_ID], 'shortButton', 'PLAY', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '26px'
        }));
        this.addChild(playButton);
        
        Utils.centerX(this.context.app.renderer, playButton);        
        playButton.y = 450;
        
        playButton.once('pointerdown', this.playButtonClickHandler, this);
    }
    
    playButtonClickHandler() {
        this.context.sceneManager.setCurrentScene(new GameModeScene());
    }
}