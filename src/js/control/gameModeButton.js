import * as PIXI from 'pixi.js';

import Button from './button';

export default class GameModeButton extends Button {
    
    static create(resource, backgroundId, iconId,  label, textStyle) {
        let textures = GameModeButton.createTextures(resource, backgroundId);
        let icon = new PIXI.Sprite(resource.textures[iconId]);
        return new GameModeButton(textures, icon, label, textStyle);
    }
    
    constructor(textures, icon, label, textStyle, autoUpdate) {
        super(textures, autoUpdate);
        
        this.icon = icon;
        this.label = label;
        this.textStyle = textStyle;
                
        this.createLabel();
        this.placeIcon();
    }
    
    createLabel() {
        let field = new PIXI.Text(this.label, this.textStyle);
        this.addChild(field);
        
        field.x = Math.floor((this.width - field.width) / 2);

        let fieldSpace = this.fieldSpace = Math.floor(this.height * .35);
        field.y = fieldSpace - field.height + 5;
    }
    
    placeIcon() {
        this.addChild(this.icon);
        
        this.icon.x = Math.floor((this.width - this.icon.width) / 2);
        
        let iconSpcaeY = this.fieldSpace;
        let iconSpace = this.iconSpace = this.height - this.fieldSpace;
        
        this.icon.y = this.height - this.icon.height - 10;
        this.icon.y = iconSpcaeY + Math.floor((iconSpace - this.icon.height) / 2);
    }
}