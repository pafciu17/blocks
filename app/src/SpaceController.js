define(function (require, exports, module) {

	function SpaceController(boardSize, blockSize) {
		this.blockSize = blockSize;
		this.blockControllers = []
		this.size = translatePixelIntoBlockCoordinates(blockSize, {
			x: boardSize.width,
			y: boardSize.height
		});
	}

	var isWithin = function(value, bottomLimit, upperLimit){
		return bottomLimit <= value && value < upperLimit;
	};

	var positionIsOccupied = function (blockControllers, newPosition) {
		return !!_.find(blockControllers, function(controller){
			var position = controller.getPosition();
			return position.x === newPosition.x && position.y === newPosition.y
		});
	};

	SpaceController.prototype.canMove = function(position){
		if (positionIsOccupied(this.blockControllers, position)) {
			return false;
		}
		return isWithin(position.x, 0, this.size.x) && isWithin(position.y, 0, this.size.y);
	};

	SpaceController.prototype.getBlockSize = function(){
		return this.blockSize;
	};

	SpaceController.prototype.getSize = function() {
		return this.size;
	};

	var translatePixelIntoBlockCoordinates = function (blockSize, position) {
		return {
			x: Math.floor(position.x / blockSize.width),
			y: Math.floor(position.y / blockSize.height)
		}
	};

	SpaceController.prototype.addBlockController = function(controller){
		this.blockControllers.push(controller);
	};

	SpaceController.prototype.addElement = function(element){
		var self = this;
		_.forEach(element.getBlockControllers(), function(controller){
			self.addBlockController(controller);
		});
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

	SpaceController.prototype.getBlockPositions = function(){
		return _.map(this.blockControllers, function(controller){
		    return controller.getPosition();
		})
	};


	SpaceController.prototype._removeBlockControllers = function(controllersToRemove){
		var self = this;
		_.forEach(controllersToRemove, function(controller){
			controller.remove();
			var index = self.blockControllers.indexOf(controller);
			self.blockControllers.splice(index, 1);
		});
	};

	SpaceController.prototype._moveDownTopBlocks = function(rowIndex){
		_.forEach(this.blockControllers, function(controller){
			var position = controller.getPosition();
			if (position.y < rowIndex) {
				controller.moveDown();
			};
		});
	}

	SpaceController.prototype.clearRow = function(rowIndex){
		var self = this;
		var toRemove = [];
		_.forEach(this.blockControllers, function(controller, index){
			var position = controller.getPosition();
			if (position.y === rowIndex) {
				toRemove.push(controller);
			}
		});
		this._removeBlockControllers(toRemove);
		this._moveDownTopBlocks(rowIndex);
	};

	SpaceController.prototype.clearRows = function(rows){
		var self = this;
		_.forEach(rows, function(row){
			self.clearRow(row);
		});
	};

	module.exports = SpaceController;
})