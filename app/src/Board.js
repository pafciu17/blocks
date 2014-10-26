define(function(require, exports, module){

	var Surface = require('famous/core/Surface');

	function Board(context, size) {
		this.context = context;
		this.surface = new Surface({
			size: [size.width, size.height],
			properties: {
				border: '1px solid black'
			}
		});
		this.context.add(this.surface);
	};

	module.exports = Board;
})