define(function (require, exports, module) {
	var Rx = require('rx.all');

	var getKeyCode = function(evt){
	    return evt.which || evt.keyCode
	};
	
	var keyCodeToKeyName = function(keyCode){
	    switch(keyCode) {
			case 37:
				return 'left';
			case 38:
				return 'up';
			case 39:
				return 'right';
			case 40:
				return 'down';
		}
		return null;
	};

	function SteeringInterface() {
		var self = this;
		this.element = null;
		this.stream = Rx.Observable.fromEvent(document, 'keydown')
			.map(getKeyCode)
			.map(keyCodeToKeyName)
			.subscribe(function(direction) {
				if (!self.element) {
					return;
				}
				switch(direction) {
					case 'left':
						if (self.element.canMoveLeft()) {
							self.element.moveLeft();
						}
						break;
					case 'right':
						if (self.element.canMoveRight()) {
							self.element.moveRight();
						}
						break;
					case 'down':
						if (self.element.canMoveDown()) {
							self.element.moveDown();
						}
						break;
					case 'up':
						if (self.element.canRotate()) {
							self.element.rotate();
						};
						break;
				};
			});
	};

	SteeringInterface.prototype.setElement = function(element){
		this.element = element;
	};

	module.exports = SteeringInterface;
})