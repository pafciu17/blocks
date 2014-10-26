define(function (require, exports, module) {
	var Surface = require('famous/core/Surface');
	var Modifier = require('famous/core/Modifier');
	var Transform = require('famous/core/Transform');

	function Block(context, size) {
		this.context = context;
		this.size = size;
		this.block = new Surface({
			size: [size.width, size.height],
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

	Block.prototype.getSize = function(){
		return this.size;
	};

	module.exports = Block;
})