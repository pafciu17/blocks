define(function (require, exports, module) {
	var Rx = require('rx.all');

	function SteeringInterface() {
		var self = this;
		this.element = null;
		this.stream = Rx.Observable.fromEvent(document, 'keydown')
			.map(function(keyEvent) {
				return keyEvent.keyIdentifier.toLowerCase();
			})
			.filter(function(keyId){
				return _.contains(['left', 'right', 'down', 'up'], keyId);
			}).subscribe(function(direction) {
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