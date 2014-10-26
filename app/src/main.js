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

	var ElementFactory = require('ElementFactory');

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

	var elementFactory = new ElementFactory(mainContext, spaceController);
	var element;
	var elements = []

	var getNewElement = function() {
		element = elementFactory.createRandomElement();
		elements.push(element);
	};
	getNewElement();

	var source = Rx.Observable.timer(0, 400);
	source.subscribe(function(){
		if (element.canMoveDown()) {
			element.moveDown();
		} else {
			spaceController.addElement(element);
			getNewElement();
		}
	});

	var arrowKeys = Rx.Observable.fromEvent(document, 'keydown')
		.map(function(keyEvent) {
			return keyEvent.keyIdentifier.toLowerCase();
		})
		.filter(function(keyId){
			return _.contains(['left', 'right', 'down'], keyId);
		});
	arrowKeys.subscribe(function(direction) {
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
			case 'down':
				if (element.canMoveDown()) {
					element.moveDown();
				}
				break;
		};
	});

	var rotateKey = Rx.Observable.fromEvent(document, 'keydown')
		.map(function(keyEvent) {
			return keyEvent.keyIdentifier.toLowerCase();
		})
		.filter(function(keyId){
			return _.contains(['u+0052'], keyId);
		});
	rotateKey.subscribe(function(){
		if (element.canRotate()) {
			element.rotate();
		};
	});


});
