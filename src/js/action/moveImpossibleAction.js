import Action from './action';

const DELTA = 10;

export default class MoveImpossibleAction extends Action {
    
    constructor(ball) {
        super();
        this.ball = ball;
        
        this.originX = ball.x;
        
        this.time = 0;
    }
    
    update(delta) {
        super.update(delta);
        
        this.ball.x = this.originX + DELTA * Math.sin(this.time) * Math.exp(-this.time / 15);
                
        this.time += delta;
        
        if (this.time > 30) {
            this.finish();
        }        
    }
    
    finish() {
        super.finish();
        
        this.ball.x = this.originX;
    }
}