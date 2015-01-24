define(function(require, exports, module) {
	function Resizer() {
		this.boardSizer = this.getBoardSizer
	}

	Block.prototype.init = function(transformClb) {
		var modifier = new Modifier({
			transform: transformClb
		});
		this.context.add(modifier).add(this.block);
	};

	Block.prototype.getSize = function() {
		return this.size;
	};

	Block.prototype.remove = function() {
		this.block.setProperties({display: 'none'});
	};

	module.exports = Resizer;
});
