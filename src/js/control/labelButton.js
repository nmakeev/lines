import * as PIXI from 'pixi.js';

import Button from './button';

export default class LabelButton extends Button {
    
    static create(resource, spriteId, label, textStyle) {
        let textures = LabelButton.createTextures(resource, spriteId);
        return new LabelButton(textures, label, textStyle);
    }
    
    constructor(textures, label, textStyle, autoUpdate) {
        super(textures, autoUpdate);
        
        this.label = label;
        this.textStyle = textStyle;
        
        this.createLabel();
    }
    
    createLabel() {
        let field = new PIXI.Text(this.label, this.textStyle);
        this.addChild(field);
        
        field.x = Math.floor((this.width - field.width) / 2);
        field.y = Math.floor((this.height - field.height) / 2) - 2;
    }

}