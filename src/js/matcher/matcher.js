export default class Matcher {
    constructor(minSize, bonusCoefficient) {        
        this.minSize = minSize;
        this.bonusCoefficient = bonusCoefficient;
    }
    
    init(ballMap) {
        this.ballMap = ballMap;
    }
    
    check(ballMap) {        
    }
    
    calculateScore(lineSize) {
        if (lineSize < this.minSize) {
            return 0;
        }        
        
        return this.minSize + Math.round((lineSize % this.minSize) * this.bonusCoefficient);
    }
}