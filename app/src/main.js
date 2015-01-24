/* globals define */

define(function(require, exports, module) {
	'use strict';
	var _ = require('underscore');

	var Engine = require('famous/core/Engine');
	var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Gameplay = require('Gameplay');
	var PointCounter = require('PointCounter');
	var PointsBoard = require('PointsBoard');
	var Modal = require('Modal');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');
	var BoardSizer = require('BoardSizer');

	var footerHeight = 30;
	var boardSizer = new BoardSizer(12, 20, footerHeight);
	var size = boardSizer.getSize();
	var containerSurface = new ContainerSurface({
		size: [size.width, size.height + footerHeight]
	});
	var layout = new HeaderFooterLayout({
		footerSize: footerHeight
	});
	containerSurface.add(layout);

	var mainContext = Engine.createContext();
	var pointCounter = new PointCounter();
	var pointsBoard = new PointsBoard(layout.footer, pointCounter);

	var gameplay = new Gameplay(layout.content, boardSizer);

	gameplay.setPointCounter(pointCounter);
	gameplay.start();

	var modal = new Modal(mainContext, 'Game Over');
	modal.setOnClickCallback(function() {
		gameplay.restart();
		modal.hide();
	});
	gameplay.setOnGameOverCallback(function() {
		modal.show();
	});

	var modifier = new StateModifier({
		align: [0.5, 0],
		origin: [0.5, 0]
	});
	mainContext.add(modifier).add(containerSurface);
});
