define(function (require, exports, module) {
	var Element = require('Element');

	function ElementFactory(context, spaceController) {
		var self = this;
		this.context = context;
		this.spaceController = spaceController;
		this.supportedElements = this.getSupportedElements();
	};

	ElementFactory.prototype.createRandomElement = function(){
		var elementOptions = this.supportedElements[_.random(this.supportedElements.length - 1)];
		return new Element(this.context, this.spaceController, elementOptions);
	};

	ElementFactory.prototype.getSupportedElements = function(){
		return [{
			shapes: [
				[{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:1, y:2}],
				[{x:0, y:2}, {x:1, y:2}, {x:2, y:2}, {x:2, y:1}],
				[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:1, y:2}],
				[{x:0, y:2}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}]
			],
			color: 'red'
		}, {
			shapes: [
				[{x: 0, y:0}, {x: 1, y:0}, {x: 0, y:1}, {x: 0, y:2}],
				[{x: 0, y:0}, {x: 0, y:1}, {x: 1, y:1}, {x: 2, y:1}],
				[{x: 1, y:0}, {x: 1, y:1}, {x: 0, y:2}, {x: 1, y:2}],
				[{x: 0, y:0}, {x: 1, y:0}, {x: 2, y:0}, {x: 0, y:1}]
			],
			color: 'green'
		}, {
			shapes: [
				[{x:0, y:0}, {x:1, y:0}, {x:0, y:1}, {x:1, y:1}]
			],
			color: 'blue'
		}, {
			shapes: [
				[{x: 1, y:0}, {x: 0, y:1}, {x: 1, y:1}, {x: 2, y:1}],
				[{x: 1, y:0}, {x: 0, y:1}, {x: 1, y:1}, {x: 1, y:2}],
				[{x: 0, y:1}, {x: 1, y:1}, {x: 2, y:1}, {x: 1, y:0}],
				[{x: 1, y:0}, {x: 1, y:1}, {x: 2, y:1}, {x: 1, y:2}]
			],
			color: 'yellow'
		}, {
			shapes: [
				[{x: 0, y:0}, {x: 0, y:1}, {x: 0, y:2}, {x: 0, y:3}],
				[{x: 0, y:0}, {x: 1, y:0}, {x: 2, y:0}, {x: 3, y:0}]
			],
			color: 'pink'
		}, {
			shapes: [
				[{x: 0, y:0}, {x: 0, y:1}, {x: 1, y:1}, {x: 1, y:2}],
				[{x: 1, y:0}, {x: 2, y:0}, {x: 0, y:1}, {x: 1, y:1}]
			],
			color: 'orange'
		}, {
			shapes: [
				[{x: 1, y:0}, {x: 0, y:1}, {x: 1, y:1}, {x: 0, y:2}],
				[{x: 0, y:0}, {x: 1, y:0}, {x: 1, y:1}, {x: 2, y:1}]
			],
			color: 'grey'
		}];
	};

	module.exports = ElementFactory;
})