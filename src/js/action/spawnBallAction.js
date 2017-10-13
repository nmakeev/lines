import SinBasedBallAction from './sinBasedBallAction';

const SPAWN_SPEED = Math.PI * .04;
const START_POINT = - Math.PI / 2;

export default class SpawnBallAction extends SinBasedBallAction {
    constructor(ball) {
        super(ball, START_POINT, ball.scale.x, SPAWN_SPEED);        
    }
    
    isFinish() {        
        return this.ball.scale.x >= 1 || this.i >= Math.PI / 2;
    }
}