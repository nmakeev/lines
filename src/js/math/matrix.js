import Cell from '../model/cell';

export default class Matrix {
    constructor(cols, rows, defaultElement = null) {
        this.cols = cols;
        this.rows = rows;
        this.size = cols * rows;
        this.arr = [];
        for (let i = 0; i < this.size; i++) {
            this.arr.push(defaultElement);
        }
    }
    
    getEmptyCellsCount() {
        let result = 0;
        for (let cell of this.arr) {
            if (cell == null) {
                result++;
            }
        }        
        return result;
    }
    
    getByIndex(index) {
        return this.arr[index];
    }
    
    convertIndexToCell(index) {        
        return new Cell(
            this.calculateColFromIndex(index),
            this.calculateRowFromIndex(index)
        );
    }
    
    calculateColFromIndex(index) {
        return index % this.cols;
    }
    
    calculateRowFromIndex(index) {
        return Math.floor(index / this.cols);
    }
    
    isEmptyInIndex(index) {
        return this.getByIndex(index) == null;
    }
    
    getObject(cell) {
        return this.arr[ this.indexByCell(cell) ];
    }
    
    setObject(cell, obj) {
        this.arr[ this.indexByCell(cell) ] = obj;
    }
    
    index(col, row) {
        return this.cols * row + col;
    }

    indexByCell(cell) {
        return this.index(cell.col, cell.row);        
    }
    
    indexOf(element) {
        let index = this.arr.indexOf(element);
        if (index == -1) {
            return;
        }
        
        return this.convertIndexToCell(index);
    }
    
    selectSiblingIndicies(index) {
        let siblings = [];
        let col = this.calculateColFromIndex(index);
        if (col > 0) {
            siblings.push(index - 1);
        }
        
        if (col < this.cols - 1) {
            siblings.push(index + 1);
        }
        
        let row = this.calculateRowFromIndex(index);
        if (row > 0) {
            siblings.push(index - this.cols);
        }
        
        if (row < this.rows - 1) {
            siblings.push(index + this.cols);
        }
        
        return siblings;
    }
}