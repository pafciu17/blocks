define(function (require, exports, module) {
	var Surface = require('famous/core/Surface');
	var Modifier = require('famous/core/Modifier');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Transitionable = require('famous/transitions/Transitionable');
	var SpringTransition = require('famous/transitions/SpringTransition');
	Transitionable.registerMethod('spring', SpringTransition);
	var Transform = require('famous/core/Transform');

	var spring = {
		method: 'spring',
		period: 1000,
		dampingRatio: 0.5
	};

	function Modal(context, text) {
		var self = this;
		this.context = context;
		this.height = 60;
		this.surface = new Surface({
			size: [undefined, this.height],
			origin: [0.5, 0.5],
			properties: {
				backgroundColor: 'red',
				border: 'black 1px solid',
				textAlign: 'center',
				padding: '20px',
				fontSize: '20px',
				lineHeight: '20px',
				height: '60px',
				fontWeight: 'bold',
				color: 'white',
				zIndex: '10'
			},
			content: '<span>' + text + '</span>'
		});

		this.surface.on('click', function() {
			self.onClickCallback();
		});

		this.modifier = new StateModifier({
			origin: [0.5, 0.5],
			align: [0.5, 0]
		});

		this.modifier.setTransform(
			Transform.translate(0, - this.height	, 0)
		);
		this.context.add(this.modifier).add(this.surface);
	}

	Modal.prototype.setOnClickCallback = function(clb){
		this.onClickCallback = clb;
	};

	Modal.prototype._getHidePosition = function(){
		return {
			x: 0,
			y: - this.height
		};
	};

	Modal.prototype._getShowPosition = function(){
		return {
			x: 0,
			y: window.innerHeight / 2
		}
	};

	Modal.prototype.move = function(position){
		this.modifier.setTransform(
			Transform.translate(position.x, position.y, 0), spring
		);
	};

	Modal.prototype.show = function(){
		var position = this._getShowPosition();
		this.move(position);
	};

	Modal.prototype.hide = function(){
		var position = this._getHidePosition();
		this.move(position);
	};

	module.exports = Modal;
})