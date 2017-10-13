import Matcher from './matcher';
import Utils from '../utils';

const MIN_SIZE = 7;
const BONUS_COEFFICIENT = 3; 

export default class SnakesMatcher extends Matcher {
    
    constructor() {
        super(MIN_SIZE, BONUS_COEFFICIENT);
    }
    
    check(ballMap) {
        let ballsToRemove = [];
        let score = 0;
        
        for (let col = 0; col < this.ballMap.cols; col++) {
            for (let row = 0; row < this.ballMap.rows; row++) {
                let index = this.ballMap.index(col, row);
                let ball = this.ballMap.getByIndex(index);
                if (ball == null || ballsToRemove.indexOf(ball) > -1) {                    
                    continue;
                }
                
                const color = ball.color;
                
                let openIndicies = this.ballMap.selectSiblingIndicies(index);
                let closedIndicies = [ index ];
                let chain = [ index ];
                
                while (openIndicies.length > 0) {
                    let openIndex = openIndicies.shift();
                    if (closedIndicies.indexOf(openIndex) > -1) {
                        continue;
                    }
                    
                    closedIndicies.push(openIndex);
                    
                    let ball = this.ballMap.getByIndex(openIndex);
                    if (ball == null || ball.color != color) {
                        continue;
                    }
                    
                    let siblings = this.ballMap.selectSiblingIndicies(openIndex);
                    for (let siblingIndex of siblings) {                        
                        openIndicies.push(siblingIndex);
                    }
                    
                    chain.push(openIndex);
                }
                
                if (chain.length < MIN_SIZE) {
                    continue;
                }
                
                for (let index of chain) {
                    Utils.addIfUnique(ballsToRemove, this.ballMap.getByIndex(index));
                }
                
                score += Math.floor(this.calculateScore(chain.length) * 1.5);
            }
        }
        
        return [ballsToRemove, score];
    }
}