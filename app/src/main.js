/* globals define */
var pointCounter;
define(function(require, exports, module) {
	'use strict';

	var _ = require('underscore');
	var Engine = require('famous/core/Engine');
	var Gameplay = require('Gameplay');
	var PointCounter = require('PointCounter');

	var Modal = require('Modal');
	var mainContext = Engine.createContext();
	var modal = new Modal(mainContext, 'Game Over');
	pointCounter = new PointCounter();



	modal.setOnClickCallback(function(){
	    gameplay.restart();
		modal.hide();
	});


	var gameplay = new Gameplay(mainContext);
	gameplay.setPointCounter(pointCounter);
	gameplay.setOnGameOverCallback(function(){
		modal.show();
	});
	gameplay.start();

});
