define(function(require, exports, module) {
	var Transform = require('famous/core/Transform');

	function BlockController() {
	}

	BlockController.prototype.assignBlock = function(block) {
		var self = this;
		this.block = block;
		this.moved = false;
		this.modifier = function() {
			return Transform.translate(self.position.x, self.position.y, 0);
		};
		this.block.init(this.modifier);
	};

	BlockController.prototype.setSpaceController = function(spaceController) {
		this.spaceController = spaceController;
	};

	var moveByDelta = function(position, delta) {
		return {
			x: position.x + delta.x,
			y: position.y + delta.y
		};
	};

	var getDeltaMovement = function(direction, blockSize) {
		switch (direction) {
			case 'down':
				return {
					x: 0,
					y: blockSize.height
				};
			case 'right':
				return {
					x: blockSize.width,
					y: 0
				};
			case 'left':
				return {
					x: -blockSize.width,
					y: 0
				};
		}
	};

	var getNewPosition = function(position, direction, blockSize) {
		return moveByDelta(position, getDeltaMovement(direction, blockSize));
	};

	BlockController.prototype.move = function(direction) {
		var newPosition = getNewPosition(this.position, direction, this.block.getSize());
		this.position = newPosition;
	};

	BlockController.prototype.canMove = function(direction) {
		var newPosition = getNewPosition(this.position, direction, this.block.getSize());
		var blockCoords = this.spaceController.pixelToBlockCoordinates(newPosition);
		return this.spaceController.canMove(blockCoords);
	};

	BlockController.prototype.canMoveDown = function() {
		return this.canMove('down');
	};

	BlockController.prototype.canMoveRight = function() {
		return this.canMove('right');
	};

	BlockController.prototype.canMoveLeft = function() {
		return this.canMove('left');
	};

	BlockController.prototype.moveDown = function() {
		this.move('down');
	};

	BlockController.prototype.moveRight = function() {
		this.move('right');
	};

	BlockController.prototype.moveLeft = function() {
		this.move('left');
	};

	BlockController.prototype.hasMoved = function() {
		return this.moved;
	};

	BlockController.prototype.getPosition = function() {
		return this.spaceController.pixelToBlockCoordinates(this.position);
	};

	BlockController.prototype.canSetPosition = function(position) {
		return this.spaceController.canMove(position);
	};

	BlockController.prototype.setPosition = function(position) {
		this.position = this.spaceController.blockToPixelCoordinates(position);
	};

	BlockController.prototype.setPosition = function(position) {
		this.position = this.spaceController.blockToPixelCoordinates(position);
	};

	BlockController.prototype.remove = function() {
		this.block.remove();
	};

	module.exports = BlockController;

});
