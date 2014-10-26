define(function (require, exports, module) {
	var Block = require('Block');
	var BlockController = require('BlockController');

	function Element(context, spaceController, shape) {
		var self = this;
		this.blockControllers = [];
		_.forEach(shape, function(position){
			console.log(position);
			var block = new Block(context, spaceController.getBlockSize());
			var blockController = new BlockController();
			blockController.setSpaceController(spaceController);
			blockController.setPosition(position);
			blockController.assignBlock(block);
			self.blockControllers.push(blockController);
		})
	};

	Element.prototype.moveDown = function(){
		_.forEach(this.blockControllers, function(controller){
			controller.moveDown();
		});
	};

	Element.prototype.moveRight = function(){
		_.forEach(this.blockControllers, function(controller){
			controller.moveRight();
		});
	};

	Element.prototype.moveLeft = function(){
		_.forEach(this.blockControllers, function(controller){
			controller.moveLeft();
		});
	};

	Element.prototype.canMove = function(direction){
	    var canMove = true;
		_.forEach(this.blockControllers, function(controller){
			if (!controller.canMove(direction)) {
				canMove = false;
			}
		});
		return canMove;
	}
	
	Element.prototype.canMoveDown = function(){
		return this.canMove('down');
	};

	Element.prototype.canMoveRight = function(){
		return this.canMove('right');
	};

	Element.prototype.canMoveLeft = function(){
		return this.canMove('left');
	};

	Element.prototype.hasMoved = function() {
		var hasMoved = true;
		_.forEach(this.blockControllers, function(controller){
			if (!controller.hasMoved()) {
				hasMoved = false;
			}
		});
		return hasMoved;
	};

	Element.prototype.getBlockControllers = function(){
		return this.blockControllers;
	};

	module.exports = Element;
})