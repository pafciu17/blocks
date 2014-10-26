define(function (require, exports, module) {

	function RowManager(spaceController) {
		this.spaceController = spaceController;
	}

	var createArrayFilledWithZeros = function (size) {
		return _.map(_.range(0, size), function() {
			return 0;
		});
	};

	var getFilledRows = function (rows, rowSize) {
		var foundRows = [];
		_.forEach(rows, function(numberOfBlocksInRow, rowIndex){
		    if (numberOfBlocksInRow === rowSize) {
				foundRows.push(rowIndex)
			}
		});
		return foundRows;
	};

	RowManager.prototype.getFilledRows = function(position){
		var occupiedBlocks = this.spaceController.getBlockPositions();
		var size = this.spaceController.getSize();
		var rows = createArrayFilledWithZeros(size.y);
		_.forEach(occupiedBlocks, function(block){
			rows[block.y] += 1;
		});
		return getFilledRows(rows, size.x);
	};

	module.exports = RowManager;
})