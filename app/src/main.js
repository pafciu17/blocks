/* globals define */
define(function(require, exports, module) {
	'use strict';

	var Engine = require('famous/core/Engine');
	var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Gameplay = require('Gameplay');
	var PointCounter = require('PointCounter');
	var PointsBoard = require('PointsBoard');
	var Modal = require('Modal');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');

	var containerSurface = new ContainerSurface({
		size: [300, 530]
	});
	var layout = new HeaderFooterLayout({
		footerSize: 30
	});
	containerSurface.add(layout);

	var mainContext = Engine.createContext();
	var modal = new Modal(mainContext, 'Game Over');
	var pointCounter = new PointCounter();
	var pointsBoard = new PointsBoard(layout.footer, pointCounter);

	modal.setOnClickCallback(function(){
	    gameplay.restart();
		modal.hide();
	});

	var gameplay = new Gameplay(layout.content);
	gameplay.setPointCounter(pointCounter);
	gameplay.setOnGameOverCallback(function(){
		modal.show();
	});
	gameplay.start();

	var modifier = new StateModifier({
		align: [0.5, 0],
		origin: [0.5, 0]
	});
	mainContext.add(modifier).add(containerSurface);
});
