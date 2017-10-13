import * as PIXI from 'pixi.js';
import Context from './context';
import MenuScene from './scene/menuScene';
import SceneManager from './scene/sceneManager';
import ActionManager from './action/actionManager';

export default class Game {
    constructor(containerId) {
        this.containerId = containerId;
    }
    
    init() {
        this.app = new PIXI.Application(760, 760, { backgroundColor: 0xFFFFFF });
        let container = document.getElementById(this.containerId);
        if (container == null) {
            throw new Error('container not found');
        }

        container.appendChild(this.app.view);
        
        this.context = new Context(
            this.app,
            new SceneManager(),
            new ActionManager()
        );       
        this.context.init();
        
        this.context.sceneManager.setCurrentScene(new MenuScene());
    }    
}

