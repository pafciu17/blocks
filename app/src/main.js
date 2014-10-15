/* globals define */
define(function(require, exports, module) {
    'use strict';

	var Engine = require('famous/core/Engine');
	var Block = require('Block');
	var BlockController = require('BlockController');
	var SpaceController = require('SpaceController');
	var _ = require('underscore');
	var Rx = require('rx.all');

	var mainContext = Engine.createContext();
	var block = new Block(mainContext);
	var blockController = new BlockController(block, {
		width: 200,
		height: 200
	});
	var spaceController = new SpaceController({width: 200, height: 200});
	blockController.start();


	var keys = Rx.Observable.fromEvent(document, 'keydown')
		.map(function(keyEvent) {
			return keyEvent.keyIdentifier;
		})
		.filter(function(keyId){
			return _.contains(['Left', 'Right', 'Up', 'Down'], keyId);
		});
	keys.subscribe(function(key) {
		positionSubject.onNext(key);
	});

	var positionSubject = new Rx.Subject();
	var position = positionSubject
		.map(function(direction){
			switch(direction) {
				case 'Left':
					return {x: -1, y: 0};
				case 'Right':
					return {x: 1, y: 0};
				case 'Up':
					return {x: 0, y: -1};
				case 'Down':
					return {x: 0, y: 1};
				default:
					return null
			};
		})
		.map(function(delta){
		    return {
				x: delta.x * 5,
				y: delta.y * 5
			}
		})
		.filter(function(delta) {
			if (!delta) {
				return false;
			}
			var position = blockController.getPosition();
			return spaceController.canMove({
				x: position.x + delta.x,
				y: position.y + delta.y
			});
		});

	position.subscribe(function(delta) {
		blockController.move(delta);
	});
});
