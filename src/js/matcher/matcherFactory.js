import LinesMatcher from './linesMatcher';
import BlocksMatcher from './blocksMatcher';
import SnakesMatcher from './snakesMatcher';

import * as GameMode from '../model/gameMode';

export default class MatcherFactory {
    
    static create(mode) {
        switch (mode) {
            case GameMode.LINES:
                return new LinesMatcher();
            case GameMode.BLOCKS:
                return new BlocksMatcher();
            case GameMode.SNAKES:
                return new SnakesMatcher();
            default:
                throw new Error('unknown game mode = ' + mode);
        }
    }
}