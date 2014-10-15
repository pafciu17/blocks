define(function (require, exports, module) {
	var Transform = require('famous/core/Transform');
	var _ = require('underscore');

	function BlockController(block, boardSize) {
		var self = this;
		this.block = block;
		this.boardSize = boardSize;
		this.position = {x:0, y:0};
		this.modifier = function() {
			return Transform.translate(self.position.x, self.position.y, 0)
		}
	}

	BlockController.prototype.setSpaceController = function(spaceController){
		this.spaceController = spaceController;
	};

	BlockController.prototype.start = function(){
		this.block.init(this.modifier);
	};

	BlockController.prototype.move = function(delta){
		this.position.x += delta.x;
		this.position.y += delta.y;
	};

	BlockController.prototype.getPosition = function(){
		return this.position;
	};

	module.exports = BlockController;

})