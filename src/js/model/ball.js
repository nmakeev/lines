import * as PIXI from 'pixi.js';

export default class Ball extends PIXI.Sprite {
    
    static fromResource(resource, color) {
        return new Ball(resource.textures[color], color);
    }
    
    constructor(texture, color) {
        super(texture);
        this.color = color;
    }
    
    setScale(value) {
        this.scale.set(value, value);
    }
    
    getScale() {
        return this.scale.x;
    }
}