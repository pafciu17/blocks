/* globals define */
define(function(require, exports, module) {
	'use strict';

	var _ = require('underscore');
	var Rx = require('rx.all');

	var Engine = require('famous/core/Engine');
	var Block = require('Block');
	var BlockController = require('BlockController');
	var Board = require('Board');
	var SpaceController = require('SpaceController');

	var Element = require('Element');

	var mainContext = Engine.createContext();
	var boardSize = {
		width: 200,
		height: 400
	};
	var blockSize = {
		width: boardSize.width / 10,
		height: boardSize.height / 20
	};

	var spaceController = new SpaceController(boardSize, blockSize);
	var board = new Board(mainContext, boardSize);

	var blockController;
	var block;
	var controllers = [];
	var blocks = [];
	var element;
	var elements = []

	var getNewElement = function() {
		element = new Element(mainContext, spaceController,
			[{x:0, y:0}, {x:0, y:1}, {x:0, y:2}, {x:1, y:2}]);
		elements.push(element);
	};
	getNewElement();


	var source = Rx.Observable.timer(0, 200);
	source.subscribe(function(){
		if (element.canMoveDown()) {
			element.moveDown();
		} else {
			spaceController.addElement(element);
			getNewElement();
		}
	});


	var keys = Rx.Observable.fromEvent(document, 'keydown')
		.map(function(keyEvent) {
			return keyEvent.keyIdentifier.toLowerCase();
		})
		.filter(function(keyId){
			return _.contains(['left', 'right'], keyId);
		});
	keys.subscribe(function(direction) {
		switch(direction) {
			case 'left':
				if (element.canMoveLeft()) {
					element.moveLeft();
				}
				break;
			case 'right':
				if (element.canMoveRight()) {
					element.moveRight();
				}
				break;
		};
	});



});
