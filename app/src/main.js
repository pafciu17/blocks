/* globals define */
define(function(require, exports, module) {
	'use strict';

	var _ = require('underscore');
	var Engine = require('famous/core/Engine');
	var Gameplay = require('Gameplay');

	var mainContext = Engine.createContext();

	var gameplay = new Gameplay(mainContext);
	gameplay.start();

});
