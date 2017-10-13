import EventEmitter from 'eventemitter3';

export default class Action extends EventEmitter {
    
    constuctor() {
        this.isFinished = false;
    }
    
    update(delta) {        
    }
    
    finish() {
        this.isFinished = true;
        this.emit('actionfinished', this);
    }
}