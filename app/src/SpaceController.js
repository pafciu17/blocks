define(function (require, exports, module) {

	function SpaceController(size) {
		this.size = size;
		this.blocksPostions = {};
	}

	var isWithin = function(value, bottomLimit, upperLimit){
		return bottomLimit <= value && value <= upperLimit;
	}

	SpaceController.prototype.canMove = function(position){
	    return isWithin(position.x, 0, this.size.width) && isWithin(position.y, 0, this.size.height);
	};

	module.exports = SpaceController;
})