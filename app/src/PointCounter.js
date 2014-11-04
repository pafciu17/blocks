define(function (require, exports, module) {

	function PointCounter() {
		this.points = 0;
	};

	PointCounter.prototype._rowsToPoints = function(numbOfRows){
		var points =_.range(1, numbOfRows + 1);
		return _.reduce(points, function(memo, number){
		    return memo + number;
		}, 0);
	};

	PointCounter.prototype.reportScoredRows = function(numbOfRows){
		this.points += this._rowsToPoints(numbOfRows);
	};

	PointCounter.prototype.getPoints = function(numbOfRows){
		return this.points;
	};

	module.exports = PointCounter;
})