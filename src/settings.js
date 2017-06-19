var Settings = function(){
	this.init();
};

Settings.prototype.init = function(){
	// Frame Rate
	this.fps = 30;
	this.framePeriod = 1/this.fps;
	
	// Rendering
	this.zBufferCnt = 2;
	this.logicSpace = {
		width: 1000,
		height: 1000
	};
	this.renderSpace = {
		width: 700,
		height: 700
	};

	// Keypress
	this.rotateCounterClockwiseKey = "z";
	this.rotateClockwiseKey = "x";

	// Rotation
	this.deltaRadOnRotate = Math.PI/18;
};

module.exports = new Settings();