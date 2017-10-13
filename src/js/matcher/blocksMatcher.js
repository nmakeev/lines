import Matcher from './matcher';
import Utils from '../utils';

const MIN_SIZE = 4;
const BONUS_COEFFICIENT = 1; 

export default class BlocksMatcher extends Matcher {
    
    constructor() {
        super(MIN_SIZE, BONUS_COEFFICIENT);
    }
    
    check(ballMap) {
        let ballsToRemove = [];
        let score = 0;
        let ignoredIndicies = [];
        
        for (let col = 0; col < this.ballMap.cols - 1; col++) {
            for (let row = 0; row < this.ballMap.rows - 1; row++) {
                let index = this.ballMap.index(col, row);
                if (ignoredIndicies.indexOf(index) > -1) {
                    continue;
                }
                
                let balls = this.selectMinSize(index);
                if (!this.isMatchColor(balls)) {
                    continue;
                }
                
                if (col + 2 < this.ballMap.cols) {
                    this.performHorizontalBonusSearch(balls, index, ignoredIndicies);
                }
                
                if (row + 2 < this.ballMap.rows) {
                    this.performVerticalBonusSearch(balls, index, ignoredIndicies);
                }
                
                for (let ball of balls) {
                    Utils.addIfUnique(ballsToRemove, ball);
                }
                
                score += this.calculateScore(balls.length);
            }   
        }
        
        return [ballsToRemove, score];
    }
    
    selectMinSize(index) {        
        return [
            this.ballMap.arr[index],
            this.ballMap.arr[index + 1],
            this.ballMap.arr[index + this.ballMap.cols],
            this.ballMap.arr[index + this.ballMap.cols + 1]
        ];
    }
    
    isMatchColor(balls) {
        if (balls[0] == null) {
            return false;
        }
        
        const color = balls[0].color;
        for (let i = 1; i < balls.length; i++) {
            if (!this.isBallMatchColor(balls[i], color)) {
                return false;
            }            
        }
        
        return true;
    }
    
    isBallMatchColor(ball, color) {
        if (ball == null) {
            return false;
        }
        
        return ball.color == color;
    }
    
    performHorizontalBonusSearch(balls, index, ignoredIndicies) {
        const color = balls[0].color; 
        const index5 = index + 2;
        const ball5 = this.ballMap.arr[index5];
        if (!this.isBallMatchColor(ball5, color)) {
            return;
        }
            
        let index6 = index5 + this.ballMap.cols;
        let ball6 = this.ballMap.arr[index6];
        if (!this.isBallMatchColor(ball6, color)) {
            return;
        }
        
        balls.push(ball5);
        balls.push(ball6);
        
        ignoredIndicies.push(index + 1);
    }
    
    performVerticalBonusSearch(balls, index, ignoredIndicies) {
        const color = balls[0].color;        
        let index7 = index + this.ballMap.cols * 2;
        let ball7 = this.ballMap.arr[index7];
        if (!this.isBallMatchColor(ball7, color)) {
            return;
        }
       
        const index8 = index7 + 1;
        const ball8 = this.ballMap.arr[index8];
        if (!this.isBallMatchColor(ball8, color)) {
           return; 
        }
       
        balls.push(ball7);
        balls.push(ball8);
        
        ignoredIndicies.push(index + this.ballMap.cols);
    }    
}