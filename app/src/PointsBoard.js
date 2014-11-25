define(function(require, exports, module) {

	var Surface = require('famous/core/Surface');

	var getLabel = function(points) {
		return '<span>Score: ' + points + '</span>';
	};

	function PointsBoard(context, pointCounter) {
		var self = this;
		this.context = context;
		this.pointCounter = pointCounter;
		this.pointCounter.setOnPointsChangeCallback(function(points) {
			self.surface.setContent(getLabel(points));
		});
		this.surface = new Surface({
			size: [60, 20],
			content: getLabel(this.pointCounter.getPoints()),
			properties: {
				backgroundColor: 'transparent',
				whiteSpace: 'nowrap',
				zIndex: 5
			}
		});
		this.context.add(this.surface);
	}

	module.exports = PointsBoard;
});
