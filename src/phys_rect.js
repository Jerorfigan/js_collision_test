var Basics = require("./basics.js");
var Vector2D = require("./math/vector2d.js");

var PhysRect = function(id, pos, width, height, color){
	this.b = new Basics(id);

	this.pos = pos;
	this.width = width;
	this.height = height;
	this.color = color;
	this.interactive = true;
};

PhysRect.prototype.update = function(){

};

PhysRect.prototype.getRenderState = function(){
	return this;
};

module.exports = PhysRect;