import SinBasedBallAction from './sinBasedBallAction';

const START_POINT = Math.PI / 2;
const MIN_SCALE = .3;
const SPAWN_SPEED = Math.PI * .04;

export default class PulseBallAction extends SinBasedBallAction {
        
    constructor(ball) {
        super(ball, START_POINT, MIN_SCALE, SPAWN_SPEED);
    }
    
    update(delta) {
        super.update(delta);
        
        if (this.i > 3 * Math.PI / 2) {
            this.i -= Math.PI;
        }
    }
    
    finish() {
        super.finish();
        this.ball.setScale(1);
    }
    
}