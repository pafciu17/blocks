define(function (require, exports, module) {
	var Rx = require('rx.all');
	var Block = require('Block');
	var BlockController = require('BlockController');
	var Board = require('Board');
	var SpaceController = require('SpaceController');
	var RowManager = require('RowManager');
	var ElementFactory = require('ElementFactory');
	var SteeringInterface = require('SteeringInterface');

	function Gameplay(context, boardSizer) {
		this.context = context;
		var size = boardSizer.getSize();
		var ratio = boardSizer.getRatio();
		var blockSize = {
			width: size.width / ratio.x,
			height: size.height / ratio.y
		};

		this.spaceController = new SpaceController(size, blockSize);
		this.board = new Board(this.context, boardSizer);
		this.rowManager = new RowManager(this.spaceController);

		var boardSizeInBlocks = this.spaceController.getSize();

		this.elementFactory = new ElementFactory(this.context, this.spaceController, {
			elementInitialPosition: {
				x: Math.round(boardSizeInBlocks.x / 2) - 1,
				y: 0
			}
		});
		this.currentElement = null;

		this.steeringInterface = new SteeringInterface(this.currentElement);
	};

	Gameplay.prototype.setPointCounter = function(pointCounter){
		this.pointCounter = pointCounter;
	};

	Gameplay.prototype._addElementToStack = function(element){
		this.spaceController.addElement(element);
		var filledRows = this.rowManager.getFilledRows();
		if (filledRows) {
			this.spaceController.clearRows(filledRows);
			this.pointCounter.reportScoredRows(filledRows.length);
		};
	};

	Gameplay.prototype._createNewElement = function(){
		var newElement = this.elementFactory.createRandomElement();
		this.steeringInterface.setElement(newElement);
		return newElement;
	};

	Gameplay.prototype._setTimeStream = function(interval, clb){
		var pauser = new Rx.Subject();
		var timeCounter = 0;
		var intervalUnit = 50;
		this.timeStream = Rx.Observable.timer(0, intervalUnit).pausable(pauser);
		this.timeStreamSubscription = this.timeStream.subscribe(function(){
		    if (timeCounter === 0) {
				clb();
				timeCounter = interval;
			}
			timeCounter -= intervalUnit;
		});
	};

	Gameplay.prototype._gameIsOver = function(){
		return this.spaceController.doesRowContainsBlocks(0);
	};

	Gameplay.prototype._startNewElementCycle = function(){
		this.currentElement = this._createNewElement();
		this.timeStream.resume();
	};

	Gameplay.prototype._startNewElementCycleOrOverTheGame = function(){
		this.timeStream.pause();
		if (this._gameIsOver()) {
			this.gameOverClb();
		} else {
			this._startNewElementCycle();
		}
	};

	Gameplay.prototype.start = function(){
		var self = this;
		this._setTimeStream(300, function(){
			if (self.currentElement.canMoveDown()) {
				self.currentElement.moveDown();
			} else {
				self._addElementToStack(self.currentElement);
				self._startNewElementCycleOrOverTheGame();
			}
		});
		this.restart();
	};

	Gameplay.prototype.restart = function(){
		this.pointCounter.reset();
		this.spaceController.clearBlocks();
		this._startNewElementCycle();
	};

	Gameplay.prototype.setOnGameOverCallback = function(clb){
		this.gameOverClb = clb;
	};

	module.exports = Gameplay;
})