define(function(require, exports, module) {

	function Sizer(context, options) {
		var self = this;
		window.addEventListener('resize', function() {
			self.resizeHandler();
		});
	}

	Sizer.prototype.resizeHandler = function() {

	};

	module.exports = Sizer;
});
