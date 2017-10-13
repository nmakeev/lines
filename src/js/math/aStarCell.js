import Cell from '../model/cell';

export default class AStarCell extends Cell {
    static fromCell(cell) {
        return new AStarCell(cell.col, cell.row);
    }
    
    constructor(col, row) {
        super(col, row);
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = null;
    }
    
    equals(cell) {
        return this.col == cell.col && this.row == cell.row;
    }
}