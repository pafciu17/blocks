/* globals define */
var bc;
define(function(require, exports, module) {
    'use strict';

	var Engine = require('famous/core/Engine');
	var Block = require('Block');
	var BlockController = require('BlockController');
	var Board = require('Board');
	var SpaceController = require('SpaceController');
	var _ = require('underscore');
	var Rx = require('rx.all');

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
	var board = new Board(mainContext, {
		width: spaceController.getWidth(),
		height: spaceController.getHeight()
	});

	var blockController;
	var block;
	var controllers = [];
	var blocks = [];
	var getNewElement = function() {
		blockController = new BlockController();
		blockController.setSpaceController(spaceController);
		block = new Block(mainContext, blockSize);
		blocks.push(block);
		blockController.assignBlock(block);
	};
	getNewElement();


	var source = Rx.Observable.timer(0, 200);
	source.subscribe(function(){
		blockController.moveDown();
		if (!blockController.hasMoved()) {
			spaceController.addBlock(blockController.getPosition());
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
				blockController.moveLeft();
				break;
			case 'right':
				blockController.moveRight();
				break;
		};
	});



});
