import SinBasedBallAction from './sinBasedBallAction';

const START_POINT = Math.PI / 2;
const MIN_SCALE = .1;
const SPAWN_SPEED = Math.PI * .04;

export default class CleanBallAction extends SinBasedBallAction {
    
    constructor(ball) {
        super(ball, START_POINT, MIN_SCALE, SPAWN_SPEED);
    }
        
    isFinish() {
        return this.ball.getScale() <= MIN_SCALE || this.i >= Math.PI * 3 / 2;
    }    
}