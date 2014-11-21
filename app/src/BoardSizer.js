define(function (require, exports, module) {

	function BoardSizer(widthRatio, heightRatio, footerSize) {
		this.widthRatio = widthRatio;
		this.heightRatio = heightRatio;
		this.footerSize = footerSize;
	}

	BoardSizer.prototype.getSize = function(){
		var innerWidth = window.innerWidth;
		var innerHeight = window.innerHeight - this.footerSize;
		var widthUnitRatio = innerWidth / this.widthRatio;
		var heightUnitRatio = innerHeight / this.heightRatio;
		var usedUnitRatio;
		if (widthUnitRatio < heightUnitRatio) {
			usedUnitRatio = Math.floor(widthUnitRatio);
		} else {
			usedUnitRatio = Math.floor(heightUnitRatio);
		}
		return {
			width: Math.floor(usedUnitRatio * this.widthRatio),
			height: Math.floor(usedUnitRatio * this.heightRatio)
		};
	};

	BoardSizer.prototype.getRatio = function(){
		return {
			x: this.widthRatio,
			y: this.heightRatio
		}
	};

	module.exports = BoardSizer;
})