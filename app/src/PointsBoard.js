define(function(require, exports, module){

	var Surface = require('famous/core/Surface');

	function PointsBoard(context, pointCounter) {
		var self = this;
		this.context = context;
		this.pointCounter = pointCounter;
		this.pointCounter.setOnPointsChangeCallback(function(points){
			self.surface.setContent(points);
		});
		this.surface = new Surface({
			size: [60, 20],
			content: this.pointCounter.getPoints(),
			properties: {
				backgroundColor: 'transparent',
				zIndex: 5
			}
		});
		this.context.add(this.surface);
	};

	module.exports = PointsBoard;
})