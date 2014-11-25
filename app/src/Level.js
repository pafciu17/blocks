define(function(require, exports, module) {
	function Level() {
		this.levelNumber = 1;
		this.numberOfUnitsToAdvanceToNextLevel = 100;
		this.progressUnit = 0;
		this.levels = {
			1: 300,
			2: 250,
			3: 200,
			4: 150,
			5: 100
		};
	}

	Level.prototype.getTimeInterval = function() {
		return this.levels[this.levelNumber];
	};

	Level.prototype.markProgress = function() {
		this.progressUnit++;
		if (this.progressUnit >= this.numberOfUnitsToAdvanceToNextLevel) {
			var newLevelNumber = this.levelNumber + 1;
			if (this.levels[newLevelNumber]) {
				this.progressUnit = 0;
				this.levelNumber = newLevelNumber;
			}
		}
	};

	Level.prototype.reset = function() {
		this.progressUnit = 0;
		this.levelNumber = 1;
	};

	module.exports = Level;
});
