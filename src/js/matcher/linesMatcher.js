import Matcher from './matcher';
import Utils from '../utils';

const MIN_LINE_SIZE = 5;
const BONUS_COEFFICIENT = 2;

export default class LinesMatcher extends Matcher {
    
    constructor() {
        super(MIN_LINE_SIZE, BONUS_COEFFICIENT);
    }
    
    init(ballMap) {
        super.init(ballMap);
        this.indexRows = [];
        
        this.calculateHorizontalIndicies(ballMap);
        this.calculateVerticalIndicies(ballMap);
        this.calculateMainDiagonalIndicies(ballMap);
        this.calculateReverseDiagonalIndicies(ballMap);
    }
    
    calculateHorizontalIndicies(ballMap) {
        for (let row  = 0; row < ballMap.rows; row++) {        
            let indexRow = [];
            for (let col = 0; col < ballMap.cols; col++) {
                indexRow.push(ballMap.index(col, row));
            }            
            this.indexRows.push(indexRow);
        }
    }
    
    calculateMainDiagonalIndicies(ballMap) {        
        for (let i = 0; i < ballMap.rows - MIN_LINE_SIZE + 1; i++) {
            let indexRow = [];
            for (let row = i, col = 0; row < ballMap.rows && col < ballMap.cols; row++, col++) {
                let index = ballMap.index(col, row);                
                indexRow.push(index);
            }
            
            if (indexRow.length == 0) {
                continue;
            }
            
            this.indexRows.push(indexRow);
        }
        
        for (let i = 1; i < ballMap.cols - MIN_LINE_SIZE + 1; i++) {
            let indexRow = [];
            for (let row = 0, col = i; row < ballMap.rows && col < ballMap.cols; row++, col++) {
                let index = ballMap.index(col, row);                
                indexRow.push(index);
            }
            
            if (indexRow.length == 0) {
                continue;
            }
            
            this.indexRows.push(indexRow);
        }
    }
    
    calculateReverseDiagonalIndicies(ballMap) {        
        for (let i = MIN_LINE_SIZE - 1; i < ballMap.rows; i++) {
            let indexRow = [];
            for (let row = i, col = 0; row >= 0 && col < ballMap.cols; row--, col++) {
                let index = ballMap.index(col, row);
                indexRow.push(index);
            }
            
            if (indexRow.length == 0) {
                continue;
            }
            
            this.indexRows.push(indexRow);
        }
        
        for (let i = 1, len = ballMap.cols - MIN_LINE_SIZE + 1; i < len; i++) {
            let indexRow = [];
            for (let row = ballMap.rows - 1, col = i; row >= 0 && col < ballMap.cols; row--, col++) {
                let index = ballMap.index(col, row);
                indexRow.push(index);
            }
            
            if (indexRow.length == 0) {
                continue;
            }
            
            this.indexRows.push(indexRow);
        }
    }
    
    calculateVerticalIndicies(ballMap) {        
        for (let col = 0; col < ballMap.cols; col++) {
            let indexRow = [];
            for (let row  = 0; row < ballMap.rows; row++) {
                indexRow.push(ballMap.index(col, row));
            }
            this.indexRows.push(indexRow);
        }
    }
    
    check(ballMap) {
        let ballsToRemove = [];
        let score = 0;
        for (let indexRow of this.indexRows) {
            let currentColor = null;
            let currentChain = 0;
            for (let i = 0; i < indexRow.length; i++) {
                let index = indexRow[i];
                let ball = ballMap.arr[index];
                if (ball != null && ball.color == currentColor) {
                    currentChain++;
                    continue;
                }
                
                if (currentChain < MIN_LINE_SIZE) {
                    if (ball == null) {
                        currentChain = 0;
                        currentColor = null;
                    } else {
                        currentChain = 1;
                        currentColor = ball.color;
                    }
                    continue;
                }
                                
                this.addLine(ballMap, ballsToRemove, indexRow, i - 1, currentChain);
                score += this.calculateScore(currentChain);
                currentChain = 0;
            }
            
            if (currentChain < MIN_LINE_SIZE) {
                continue;
            }
                        
            this.addLine(ballMap, ballsToRemove, indexRow, indexRow.length - 1, currentChain);
            score += this.calculateScore(currentChain);
        }
        
        return [ballsToRemove, score];
    }
    
    addLine(ballMap, ballsToRemove, indexRow, currentIndex, currentChain) {
        while(currentChain > 0) {
            Utils.addIfUnique(
                ballsToRemove,
                ballMap.arr[indexRow[currentIndex]]
            );
            currentIndex--;
            currentChain--;
        }
    }
}