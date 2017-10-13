import Action from './action';

const MOVE_SPEED = 15;

export default class MoveBallAction extends Action {
    constructor(ball, path) {
        super();
        this.ball = ball;
        this.path = path;        
        
        this.pathIndex = 0;
    }
    
    update(delta) {
        super.update(delta);
        
        if (this.path.length == this.pathIndex) {
            this.finish();
            return;
        }
        
        let target = this.path[this.pathIndex];        
        this.move('x', target, delta);
        this.move('y', target, delta);
        
        if (this.isBallIn(target)) {
            this.pathIndex++;
        }
    }
    
    move(axis, target, delta) {
        let vectorAxis = target[axis] - this.ball[axis];
        let diff = Math.abs(vectorAxis);
        if (diff == 0) {
            return;
        }
        
        let path = MOVE_SPEED * delta * Math.sign(vectorAxis);
        
        if (path < 0 && this.ball[axis] + path < target[axis] ||
            path > 0 && this.ball[axis] + path > target[axis]) {
            this.ball[axis] = target[axis];
            return;
        }        
        
        this.ball[axis] += path;
    }
    
    isBallIn(target) {
        return this.ball.x == target.x && this.ball.y == target.y;
    }    
}