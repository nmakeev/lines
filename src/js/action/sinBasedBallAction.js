import Action from './action';

export default class SinBasedBallAction extends Action {
    
    constructor(ball, startPoint, minScale, speed) {
        super();
        
        this.ball = ball;
        this.x = startPoint;
        this.minScale = minScale;
        this.speed = speed;
    }
    
    update(delta) {
        super.update(delta);
        
        if (this.isFinish()) {
            this.finish();
            return;
        }
        
        this.ball.setScale(this.minScale + (1 - this.minScale) * this.sin());
        
        this.x += this.speed;
    }
    
    isFinish() {
        return false;
    }
    
    sin() {
        return Math.sin(this.x) * .5 + .5;
    }
}