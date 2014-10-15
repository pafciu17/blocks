define(function (require, exports, module) {
	var Surface = require('famous/core/Surface');
	var Modifier = require('famous/core/Modifier');
	var Transform = require('famous/core/Transform');

	function Block(context) {
		this.context = context;
		this.block = new Surface({
			size: [30, 30],
			properties: {
				backgroundColor: 'red',
				border: 'black 1px solid',
				textAlign: 'center'
			}
		});
	}

	Block.prototype.init = function(transformClb){
		var modifier = new Modifier({
			transform: transformClb
		});
		this.context.add(modifier).add(this.block);
	};

	module.exports = Block;
})