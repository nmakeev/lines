import * as PIXI from 'pixi.js';

import { SPRITE_ID, resourcePaths } from '../resources.js';

export default class ModalBox extends PIXI.Sprite {

    constructor() {
        super(PIXI.loader.resources[SPRITE_ID].textures['modal']);
    }
    
    close() {
        this.emit('close', this);
    }
}