define(function (require, exports, module) {
	var Surface = require('famous/core/Surface');
	var Modifier = require('famous/core/Modifier');
	var Transform = require('famous/core/Transform');

	function Block(context, options) {
		this.context = context;
		this.size = options.size || {};
		this.color = options.color || '';
		this.block = new Surface({
			size: [this.size.width, this.size.height],
			properties: {
				backgroundColor: this.color,
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