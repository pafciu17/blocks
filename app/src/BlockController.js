define(function (require, exports, module) {
	var Transform = require('famous/core/Transform');
	var _ = require('underscore');

	function BlockController() {
	}

	BlockController.prototype.assignBlock = function(block){
		var self = this;
		this.block = block;
		this.position = {x:0, y:0};
		this.moved = false;
		this.modifier = function() {
			return Transform.translate(self.position.x, self.position.y, 0)
		}
		this.block.init(this.modifier);
	}

	BlockController.prototype.setSpaceController = function(spaceController){
		this.spaceController = spaceController;
	};

	var moveByDelta = function(position, delta){
		return {
			x: position.x + delta.x,
			y: position.y + delta.y
		};
	};

	BlockController.prototype.move = function(delta){
		var newPosition = moveByDelta(this.position, delta);
		if (this.spaceController.canMove(newPosition)) {
			this.position = newPosition;
			this.moved = true;
		} else {
			this.moved = false;
		}
	};

	BlockController.prototype.moveDown = function(){
		this.move({
			x: 0,
			y: this.block.getSize().height
		});
	};

	BlockController.prototype.moveRight = function(){
		this.move({
			x: this.block.getSize().width,
			y: 0
		});
	};

	BlockController.prototype.moveLeft = function(){
		this.move({
			x: -this.block.getSize().width,
			y: 0
		});
	};

	BlockController.prototype.hasMoved = function() {
		return this.moved;
	};

	BlockController.prototype.getPosition = function(){
		return this.position;
	};

	module.exports = BlockController;

})