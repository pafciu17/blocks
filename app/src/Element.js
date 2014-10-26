define(function (require, exports, module) {
	var Block = require('Block');
	var BlockController = require('BlockController');

	function Element(context, spaceController, shapes) {
		var self = this;
		this.blockControllers = [];
		this.shapes = shapes;
		this.currentShapeIndex = 0;
		this.position = {
			x: 0,
			y: 0
		};
		_.forEach(this.shapes[this.currentShapeIndex], function(position){
			var block = new Block(context, spaceController.getBlockSize());
			var blockController = new BlockController();
			blockController.setSpaceController(spaceController);
			blockController.setPosition(position);
			blockController.assignBlock(block);
			self.blockControllers.push(blockController);
		})
	};

	Element.prototype.moveDown = function(){
		this.position.y += 1;
		_.forEach(this.blockControllers, function(controller){
			controller.moveDown();
		});
	};

	Element.prototype.moveRight = function(){
		this.position.x += 1;
		_.forEach(this.blockControllers, function(controller){
			controller.moveRight();
		});
	};

	Element.prototype.moveLeft = function(){
		this.position.x -= 1;
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


	var getNewShapeIndex = function(currentIndex, length){
	    return (currentIndex + 1) % length;
	}

	Element.prototype.canRotate = function(){
		var self = this;
		var newIndex = getNewShapeIndex(this.currentShapeIndex, this.shapes.length);
		var newShape = this.shapes[newIndex];
		var canMove = true;
		_.forEach(this.blockControllers, function(controller, index){
			if (!controller.canSetPosition(getNewPosition(self.position, newShape[index]))) {
				canMove = false;
			}
		});
		return canMove;
	};
	
	var getNewPosition = function(oldPosition, delta){
	    return {
			x: oldPosition.x + delta.x,
			y: oldPosition.y + delta.y
		}
	}

	Element.prototype.rotate = function(){
		var self = this;
		this.currentShapeIndex = getNewShapeIndex(this.currentShapeIndex, this.shapes.length);
		var newShape = this.shapes[this.currentShapeIndex];
		_.forEach(this.blockControllers, function(controller, index){
			controller.setPosition(getNewPosition(self.position, newShape[index]));
		})
	};

	Element.prototype.getBlockControllers = function(){
		return this.blockControllers;
	};

	module.exports = Element;
})