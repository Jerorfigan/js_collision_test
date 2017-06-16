var settings = require("../settings.js");
var Vector2D = require("../math/Vector2D.js");

var FXUtils = function(){
	
};

// Transformation functions for converting coordinates between logical space and render space and vice versa //

FXUtils.prototype.logicX2renderX = function(x){
	return x * (settings.renderSpace.width / settings.logicSpace.width);
};
FXUtils.prototype.logicY2renderY = function(y){
	return y * (settings.renderSpace.height / settings.logicSpace.height);
};
FXUtils.prototype.renderX2logicX = function(x){
	return x * (settings.logicSpace.width / settings.renderSpace.width);
};
FXUtils.prototype.renderY2logicY = function(y){
	return y * (settings.logicSpace.height / settings.renderSpace.height);
};
FXUtils.prototype.logicV2renderV = function(v){
	return new Vector2D(this.logicX2renderX(v.x), this.logicY2renderY(v.y));
};
FXUtils.prototype.renderV2logicV = function(v){
	return new Vector2D(this.renderX2logicX(v.x), this.renderY2logicY(v.y));
};

module.exports = new FXUtils;