define(function (require, exports, module) {

	function SpaceController(boardSize, blockSize) {
		this.boardSize = boardSize;
		this.blockSize = blockSize;
		this.blocks = []
		this.movableSize = {
			width: boardSize.width - blockSize.width,
			height: boardSize.height - blockSize.height
		}
	}

	var isWithin = function(value, bottomLimit, upperLimit){
		return bottomLimit <= value && value <= upperLimit;
	};

	var positionIsOccupied = function (blocks, newPosition) {
		return !!_.find(blocks, function(item){
			return item.x === newPosition.x && item.y === newPosition.y
		});
	};

	SpaceController.prototype.canMove = function(position){
		var newPosition = translatePixelIntoBlockCoordinates(this.blockSize, position);
		if (positionIsOccupied(this.blocks, newPosition)) {
			return false;
		}
	    return isWithin(position.x, 0, this.movableSize.width) && isWithin(position.y, 0, this.movableSize.height);
	};

	SpaceController.prototype.getSize = function(){
		return this.boardSize.height;
	};

	SpaceController.prototype.getBlockSize = function(){
		return this.blockSize;
	};

	var translatePixelIntoBlockCoordinates = function (blockSize, position) {
		return {
			x: Math.floor(position.x / blockSize.width),
			y: Math.floor(position.y / blockSize.height)
		}
	};

	SpaceController.prototype.addBlock = function(position){
		this.blocks.push(position);
	};

	SpaceController.prototype.addElement = function(element){
		var self = this;
		_.forEach(element.getBlockControllers(), function(controller){
			self.blocks.push(controller.getPosition());
		})
	};

	SpaceController.prototype.pixelToBlockCoordinates = function(pixelsCoords){
		return {
			x: Math.floor(pixelsCoords.x / this.blockSize.width),
			y: Math.floor(pixelsCoords.y / this.blockSize.height)
		}
	};

	SpaceController.prototype.blockToPixelCoordinates = function(blockCoords){
		return {
			x: blockCoords.x  * this.blockSize.width,
			y: blockCoords.y  * this.blockSize.height
		}
	};

	module.exports = SpaceController;
})