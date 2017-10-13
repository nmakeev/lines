import * as PIXI from 'pixi.js';

const NORMAL_STATE = 0;
const HOVER_STATE = 1;

const HOVER_POSTFIX = 'Hover';

export default class Button extends PIXI.extras.AnimatedSprite {
    
    static create(resource, spriteId) {
        let textures = Button.createTextures(resource, spriteId);
        return new Button(textures);
    }
    
    static createTextures(resource, spriteId) {
        let textures = [            
            resource.textures[spriteId],
            resource.textures[spriteId + HOVER_POSTFIX]
        ];
        return textures;
    }
    
    constructor(textures, autoUpdate) {
        super(textures, autoUpdate);
        
        this.buttonMode = this.interactive = true;
        
        this.gotoAndStop(NORMAL_STATE);
        
        this.on('pointerover', this.pointerover);
        this.on('pointerout', this.pointerout);
    }

    pointerover() {
        this.gotoAndStop(HOVER_STATE);
    }

    pointerout() {
        this.gotoAndStop(NORMAL_STATE);
    }
}