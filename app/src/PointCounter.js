define(function (require, exports, module) {

	function PointCounter() {
		this.reset();
	};

	PointCounter.prototype._rowsToPoints = function(numbOfRows){
		var points =_.range(1, numbOfRows + 1);
		return _.reduce(points, function(memo, number){
		    return memo + number;
		}, 0);
	};

	PointCounter.prototype.reportScoredRows = function(numbOfRows){
		this.points += this._rowsToPoints(numbOfRows);
		this._firePointsChangeEvent();
	};

	PointCounter.prototype.getPoints = function(numbOfRows){
		return this.points;
	};

	PointCounter.prototype.reset = function(){
		this.points = 0;
		this._firePointsChangeEvent();
	};
	
	PointCounter.prototype.setOnPointsChangeCallback = function(clb){
	    this.onPointsChangeCallback = clb;
	};

	PointCounter.prototype._firePointsChangeEvent = function(){
		if (this.onPointsChangeCallback) {
			this.onPointsChangeCallback(this.points);
		};
	};

	module.exports = PointCounter;
})