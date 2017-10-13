import * as PIXI from 'pixi.js';

export default class SceneManager {
    
    constructor() {
        this.currentScene = null;
    }
    
    init(context) {
        this.context = context;
        
        this.sceneContainer = new PIXI.Container();
        this.modalContainer = new PIXI.Container();
        
        this.context.app.stage.addChild(this.sceneContainer);
        this.context.app.stage.addChild(this.modalContainer);
    }
    
    setCurrentScene(newScene) {        
        if (this.currentScene != null) {
            this.sceneContainer.removeChild(this.currentScene);
            this.currentScene.destroy();            
        }
        
        this.currentScene = newScene;
        if (this.currentScene != null) {
            this.sceneContainer.addChild(this.currentScene);            
            this.currentScene.init(this.context);            
        }
    }
    
    showModalBox(modalBox, padding) {
        if (modalBox == null) {
            return;
        }
        
        this.sceneContainer.interactiveChildren = false;
        this.modalContainer.addChild(modalBox);
        
        modalBox.once('close', this.closeModalBox, this);
        
        modalBox.x = (this.context.app.renderer.width - modalBox.width) / 2;
        modalBox.y = (this.context.app.renderer.height - modalBox.height) / 2;
        
        if (padding != null) {
            modalBox.x += padding.x;
            modalBox.y += padding.y;
        }
    }
    
    closeModalBox(modalBox) {
        this.modalContainer.removeChild(modalBox);
        
        if (this.modalContainer.children.length == 0) {
            this.sceneContainer.interactiveChildren = true;
        }
    }
}