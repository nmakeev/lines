export default class Context {
    
    constructor(app, sceneManager, actionManager) {
        this.app = app;
        this.sceneManager = sceneManager;
        this.actionManager = actionManager;
    }
    
    init() {
        this.sceneManager.init(this);
        this.actionManager.init(this);
    }

    get container() {
        return this.sceneManager.currentScene.container;
    }
}