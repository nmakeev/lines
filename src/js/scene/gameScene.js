import * as PIXI from 'pixi.js';

import { SPRITE_ID, resourcePaths } from '../resources.js';

import Scene from './scene';
import GameModeScene from './gameModeScene';
import Field from '../model/field';
import Cell from '../model/cell';
import Ball from '../model/ball';

import Matrix from '../math/matrix';
import AStarMap from '../math/aStarMap';
import Utils from '../utils';
import MatcherFactory from '../matcher/matcherFactory';

import MoveBallAction from '../action/moveBallAction';
import SpawnBallAction from '../action/spawnBallAction';
import PulseBallAction from '../action/pulseBallAction';
import CleanBallAction from '../action/cleanBallAction';
import MoveImpossibleAction from '../action/moveImpossibleAction';

import GameOverBox from '../modal/gameOverBox';

const NEW_BALLS_BY_TURN = 3;
const COLORS = [ 'red' , 'orange', 'yellow', 'green', 'cyan', 'purple' ];
const TEXTURES = PIXI.loader.resources;

export default class GameScene extends Scene {
    
    constructor(gameMode) {
        super();
        this.gameMode = gameMode;
    }
    
    init(context) {
        super.init(context);
        
        this.createField();
        this.createScores();
        this.createMatcher();
        this.registerActionHandler();
        this.generateNewBalls();
    }
    
    createField() {
        let colCount = 9,
            rowCount = 9;        
        
        let field = this.field = new Field(
            TEXTURES[SPRITE_ID].textures['field'], 
            {
                colCount: colCount,
                rowCount: rowCount,
                borderSize: 3
            }
        );        
        this.addChild(field);
        field.position = new PIXI.Point(63, 110);
        field.init();
        
        field.on('cellselected', this.cellSelectedHandler, this);
        
        this.ballMap = new Matrix(colCount, rowCount);
    }
    
    createScores() {
        this.score = 0;
        
        let scoreField = this.scoreField = new PIXI.Text('0', new PIXI.TextStyle({
            fontFamily: 'Corbert',
            fontSize: '60px'
        }));
        this.addChild(scoreField);

        scoreField.anchor.set(.5);
        scoreField.x = this.context.app.renderer.width / 2;
        scoreField.y = 60 + .5;
    }
    
    createMatcher() {
        this.mather = MatcherFactory.create(this.gameMode);
        this.mather.init(this.ballMap);
    }
    
    registerActionHandler() {
        this.context.actionManager.on('actionfinished', this.actionFinishedHandler, this);
    }
    
    actionFinishedHandler(action) {
        if (action instanceof CleanBallAction) {
            this.removeBallFromField(action.ball);
            return;
        }
        
        if (action instanceof MoveBallAction) {
            this.newTurn();
            return;
        }
    }
    
    generateNewBalls() {
        if (this.ballMap.getEmptyCellsCount() < NEW_BALLS_BY_TURN) {
            this.gameOver();
            return;
        }
        
        let elapsedBalls = NEW_BALLS_BY_TURN;
        while (elapsedBalls > 0) {
            let index = Utils.randomInt(0, this.ballMap.size);
            if (!this.ballMap.isEmptyInIndex(index)) {
                continue;
            }            
            
            let cell = this.ballMap.convertIndexToCell(index);
            let color = this.generateRandomColor();
            this.createBall(cell, color);
            elapsedBalls--;
        }
        
        this.checkLines(false);
    }
    
    gameOver() {
        let gameOverBox = new GameOverBox(this.score);
        gameOverBox.once('newgameclick', this.gameOverBoxResultHandler, this);
        this.context.sceneManager.showModalBox(gameOverBox, new PIXI.Point(0, -10));
    }
    
    gameOverBoxResultHandler() {
        this.context.sceneManager.setCurrentScene(new GameModeScene());
    }
    
    checkLines(spawnAfter) {
        let [ballsToClean, score] = this.mather.check(this.ballMap);
        if (ballsToClean.length == 0) {
            if (spawnAfter) {
                this.generateNewBalls();
                return;
            }
            
            if (this.ballMap.getEmptyCellsCount() == 0) {
                this.gameOver();
            }
            
            return;
        }
        
        this.changeScores(score);
        
        this.cancelSpawnActionForCleanBalls(ballsToClean);
                
        this.cleanBalls(ballsToClean);
    }
    
    cleanBalls(ballsToClean) {
        for (let ball of ballsToClean) {
            let cell = this.ballMap.indexOf(ball);
            this.ballMap.setObject(cell, null);
            
            this.context.actionManager.addAction(new CleanBallAction(ball));
        }
    }
    
    cancelSpawnActionForCleanBalls(ballsToClean) {
        this.context.actionManager.finishIf((action) => {
            return action instanceof SpawnBallAction && ballsToClean.indexOf(action.ball) > -1;
        });
    }
    
    removeBallFromField(ball) {
        this.removeChild(ball);
    }
    
    changeScores(score) {
        if (score == 0) {
            return;
        }
        
        this.score += score;        
        this.scoreField.text = this.score;
    }
    
    generateRandomColor() {
        let index = Utils.randomInt(0, COLORS.length);
        return COLORS[index];
    }    
    
    cellSelectedHandler(targetCell) {
        if (this.context.actionManager.hasAction(MoveBallAction)) {
            return;
        }
        
        let ball = this.ballMap.getObject(targetCell);
        if (ball == null) {
            this.moveSelectedBall(targetCell);
            return;
        }
        
        this.selectBall(ball);
    }
    
    moveSelectedBall(targetCell) {
        if (this.selectedBall == null) {
            return;
        }
        
        let ball = this.selectedBall;
        
        let sourceCell = this.ballMap.indexOf(ball);
        let path = AStarMap.findPath(this.ballMap, sourceCell, targetCell);        
        path.splice(0, 1);
        if (path.length == 0) {
            this.notifyImposibleTurn(ball);
            return;
        }
        
        this.ballMap.setObject(sourceCell, null);
        this.ballMap.setObject(targetCell, ball);
        
        let points = this.convertPathToPointArray(path);
        this.context.actionManager.addAction(new MoveBallAction(ball, points));        
        
        this.clearSelect();
    }
    
    notifyImposibleTurn(ball) {
        if (this.context.actionManager.hasAction(MoveImpossibleAction)) {
            return;
        }
        
        this.context.actionManager.addAction(new MoveImpossibleAction(ball));
    }
    
    newTurn() {
        this.checkLines(true);
    }
    
    selectBall(ball) {
        this.clearSelect();
        
        this.selectedBall = ball;
        this.context.actionManager.addAction(new PulseBallAction(ball));
    }
    
    clearSelect() {
        if (this.selectedBall == null) {
            return;
        }
        
        this.context.actionManager.finishActionsByClass(PulseBallAction);
        this.selectedBall = null;
    }
    
    convertPathToPointArray(path) {
        let points = [];
        for (let cell of path) {
            points.push(this.field.getCellCenter(cell));
        }
        return points;
    }
    
    createBall(cell, color) {        
        let ball = Ball.fromResource(TEXTURES[SPRITE_ID], color);        
        this.addChild(ball);
        
        ball.setScale(.2);
        ball.anchor.set(.5);        
        ball.position = this.field.getCellCenter(cell);
        
        this.ballMap.setObject(cell, ball);
        this.context.actionManager.addAction(new SpawnBallAction(ball));
    }
    
    destroy() {
        this.context.actionManager.removeListener('actionfinished', this.actionFinishedHandler, this);
        this.context = null;
    }
}