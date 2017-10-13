import * as PIXI from 'pixi.js';
import EventEmitter from 'eventemitter3';

import Cell from './cell';

const RESOURCES = PIXI.loader.resources;

export default class Field extends PIXI.Sprite {
    constructor(texture, params) {
        super(texture);
        
        this.colCount = params.colCount || 10;
        this.rowCount = params.rowCount || 10;
        this.borderSize = params.borderSize || 3;        
    }
    
    init() {
        this.buttonMode = this.interactive = true;
        this.on('pointerdown', this.pointerDownHandler, this);
        
        this.cellWidth = (this.width - 2 * this.borderSize) / this.colCount;
        this.cellHeight = (this.height - 2 * this.borderSize) / this.rowCount;
                
        this.cellWidth = Math.floor(this.cellWidth * 10) / 10;
        this.cellHeight = Math.floor(this.cellHeight * 10) / 10;
    }
    
    pointerDownHandler(event) {
        let point = event.data.getLocalPosition(this);
        
        let col = parseInt((point.x - this.borderSize) / this.cellWidth);
        let row = parseInt((point.y - this.borderSize) / this.cellHeight);
        
        if (col < 0 || col > this.colCount - 1 ||
            row < 0 || row > this.rowCount - 1) {
                return;
        }
        
        this.emit('cellselected', new Cell(col, row));
    }
    
    getCellCenter(cell) {
        let x = this.x + this.borderSize + cell.col * this.cellWidth + this.cellWidth / 2,
            y = this.y + this.borderSize  + cell.row * this.cellHeight + this.cellHeight / 2;        
            
        x += this.calculateDelta(cell.col);
        y += this.calculateDelta(cell.row);
        
        x = Math.round(x);
        y = Math.round(y);
        
        return new PIXI.Point(x, y);
    }
    
    calculateDelta(index) {
        const middle = 4;
        const delta = 1;
        
        if (index < middle) {
            return -delta;
        }
        
        return index > middle ? delta : 0;
    }
}