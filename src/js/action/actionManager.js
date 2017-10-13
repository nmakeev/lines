import EventEmitter from 'eventemitter3';

export default class ActionManager extends EventEmitter {
    constructor() {
        super();
        this.actions = [];        
    }
    
    init(context) {
        this.context = context;
        
        this.context.app.ticker.add(this.updateAction.bind(this));
    }
    
    hasAction(actionClass) {
        for (let action of this.actions) {
            if (action instanceof actionClass) {
                return true;
            }
        }
        
        return false;
    }
    
    finishIf(predicate) {
        let testedActions = [];
        
        for (let action of this.actions) {
            if (predicate(action)) {
                testedActions.push(action);
            }
        }        
        
        this.finishActions(testedActions);
    }
    
    finishActionsByClass(actionClass) {
        let testedActions = [];
        
        for (let action of this.actions) {
            if (action instanceof actionClass) {
                testedActions.push(action);
            }
        }
        
        this.finishActions(testedActions);
    }
    
    finishActions(actions) {
        if (actions.length == 0) {
            return;
        }
        
        for (let action of actions) {
            action.finish();
        }
    }

    addAction(action, handler) {          
        action.once('actionfinished', this.removeAction, this);        
        this.actions.push(action);        
    }    
    
    updateAction(delta) {
        for (let action of this.actions) {
            action.update(delta);
        }
    }
    
    removeAction(action) {
        let index = this.actions.indexOf(action);
        if (index == -1) {
            return;
        }
        
        this.actions.splice(index, 1);
        this.emit('actionfinished', action);
    }
}