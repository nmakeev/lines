import AStarCell from './aStarCell';

export default class AstarMap {
    static findPath(matrix, sourceCell, targetCell) {
        let targetAstar = AStarCell.fromCell(targetCell);
        let openList = [ AStarCell.fromCell(sourceCell) ],
            closedList = [ ];
        while (openList.length > 0) {
            let currentCell = this.findLowestRank(openList);
            
            if (currentCell.equals(targetCell)) {
                let current = currentCell;
                let path = [];
                while (current.parent != null) {
                    path.push(current);
                    current = current.parent;
                }
                path.push(current);
                path = path.reverse();
                this.optimizePath(path);
                return path;
            }
            
            this.removeFromList(openList, currentCell);
            
            closedList.push(currentCell);
            
            let neighbors = this.findNeighbors(currentCell, matrix);
            for (let neighbor of neighbors) {
                if (matrix.getObject(neighbor) != null ||
                    this.contains(closedList, neighbor)) {
                        continue;
                    }
                
                let g = currentCell.g + 10;
                let bestG = false;
                if (!this.contains(openList, neighbor)) {
                    bestG = true;
                    neighbor.h = this.manhattan(currentCell, neighbor);
                    openList.push(neighbor);
                } else if (g < neighbor.g) {
                    bestG = true;
                }
                
                if (bestG) {
                    neighbor.parent = currentCell;
                    neighbor.g = g;
                    neighbor.f = neighbor.g + neighbor.h;
                }
            }            
        }
        
        return [];        
    }
    
    static equals3(a, b, c) {
        return a == b && b == c;
    }

    static checkTransit(cellA, cellB, cellC) {
        return (this.equals3(cellA.col, cellB.col, cellC.col) && 
               Math.abs(cellA.row - cellB.row) == 1 && Math.abs(cellB.row - cellC.row) == 1) ||
               (this.equals3(cellA.row, cellB.row, cellC.row) &&
               Math.abs(cellA.col - cellB.col) == 1 && Math.abs(cellB.col - cellC.col) == 1);    
    }
            
    static optimizePath(path) {
        if (path.length < 3) {
            return;
        }
        
        let selectedCell = path[0];
        let unusedCells = [];
        for (let i = 1; i < path.length - 1; i++) {
            let currentCell = path[i],
                nextCell = path[i + 1];
            if (this.checkTransit(selectedCell, currentCell, nextCell)) {
                unusedCells.push(currentCell);
            } 
            selectedCell = currentCell;                    
        }        
        
        for (let cell of unusedCells) {               
            let index = path.indexOf(cell);
            if (index == -1) {
                continue;
            }
            path.splice(index, 1);
        }
    }
    
    static contains(list, point) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].equals(point)) {
                return true;
            }
        }
        
        return false;
    }
    
    static findNeighbors(currentCell, matrix) {
        let neighbors = [];
        let col = currentCell.col - 1;
        if (col > -1) {
            neighbors.push(new AStarCell(col, currentCell.row));
        }
        
        col = currentCell.col + 1;
        if (col < matrix.cols) {
            neighbors.push(new AStarCell(col, currentCell.row));
        }
        
        let row = currentCell.row - 1;
        if (row > -1) {
            neighbors.push(new AStarCell(currentCell.col, row));
        }
        
        row = currentCell.row + 1;
        if (row < matrix.rows) {
            neighbors.push(new AStarCell(currentCell.col, row));
        }
        
        return neighbors;
    }
    
    static findLowestRank(list) {
        if (list.length == 0) {
            return null;
        }
        
        if (list.length == 1) {
            return list[0];
        }       
        
        let selectedCell = list[0];
        let f = selectedCell.f;
        for (let i = 1; i < list.length; i++) {
            let cell = list[i];
            if (cell.f < f) {
                selectedCell = cell;
                f = cell.f;
            }
        }
        return selectedCell;
    }
    
    static removeFromList(list, element) {
        let index = list.indexOf(element);
        if (index == -1) {
            return;
        }
        
        list.splice(index, 1);
    }
    
    static manhattan(cell, anoterCell) {
        return Math.abs(cell.col - anoterCell.col) + Math.abs(cell.row - anoterCell.row);
    }
}

