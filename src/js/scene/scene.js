import * as PIXI from 'pixi.js';

export default class Scene extends PIXI.Container {
    
    constructor() {
        super();
    }
    
    init(context) {
        this.context = context;        
    }
    
    destroy() {        
        this.context = null;
    }
}