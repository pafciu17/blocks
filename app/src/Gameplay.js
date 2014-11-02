define(function (require, exports, module) {
	var Rx = require('rx.all');
	var Block = require('Block');
	var BlockController = require('BlockController');
	var Board = require('Board');
	var SpaceController = require('SpaceController');
	var RowManager = require('RowManager');
	var ElementFactory = require('ElementFactory');
	var SteeringInterface = require('SteeringInterface');

	function Gameplay(context) {
		this.context = context;
		var boardSize = {
			width: 300,
			height: 500
		};
		var blockSize = {
			width: boardSize.width / 12,
			height: boardSize.height / 20
		};

		this.spaceController = new SpaceController(boardSize, blockSize);
		this.board = new Board(this.context, boardSize);
		this.rowManager = new RowManager(this.spaceController);

		this.elementFactory = new ElementFactory(this.context, this.spaceController);
		this.currentElement = null;

		this.steeringInterface = new SteeringInterface(this.currentElement);
	};

	Gameplay.prototype._addElementToStack = function(element){
		this.spaceController.addElement(element);
		var filledRows = this.rowManager.getFilledRows();
		if (filledRows) {
			this.spaceController.clearRows(filledRows);
		};
	};

	Gameplay.prototype._createNewElement = function(){
		var newElement = this.elementFactory.createRandomElement();
		this.steeringInterface.setElement(newElement);
		return newElement;
	};

	Gameplay.prototype._setTimeStream = function(interval, clb){
		var pauser = new Rx.Subject();
		this.timeStream = Rx.Observable.timer(0, 300).pausable(pauser);
		this.timeStreamSubscription = this.timeStream.subscribe(clb);
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
		this._setTimeStream(100, function(){
			if (self.currentElement.canMoveDown()) {
				self.currentElement.moveDown();
			} else {
				self._addElementToStack(self.currentElement);
				self._startNewElementCycleOrOverTheGame();
			}
		});
		this._startNewElementCycle();
	};

	Gameplay.prototype.restart = function(){
		this.spaceController.clearBlocks();
		this._startNewElementCycle();
	};

	Gameplay.prototype.onGameOver = function(clb){
		this.gameOverClb = clb;
	};

	module.exports = Gameplay;
})