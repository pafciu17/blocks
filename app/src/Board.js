define(function(require, exports, module){

	var Surface = require('famous/core/Surface');

	function Board(context) {
		this.context = context;
		this.surface = new Surface({
			size: [300, 600],
			properties: {
				border: '1px solid black'
			}
		});
		this.context.add(this.surface);
		console.log('context');
	};

	module.exports = Board;
})