var settings = require("../settings.js");
var Vector2D = require("../math/Vector2D.js");

var FXUtils = function(){
	
};

// Transforms logical width to render width
FXUtils.prototype.logicW2renderW = function(w){
	return w * (settings.renderSpace.width / settings.logicSpace.width);
};

// Transforms logical height to render height
FXUtils.prototype.logicH2renderH = function(h){
	return h * (settings.renderSpace.height / settings.logicSpace.height);
};

FXUtils.prototype.logicV2renderV = function(v){
	return new Vector2D(this.logicW2renderW(v.x), this.logicH2renderH(v.y));
};

module.exports = new FXUtils;