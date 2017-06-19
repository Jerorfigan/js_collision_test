var utils = require("../utils.js");
var PhysObjFX = require("./PhysObjFX");

var PhysRectFX = function(physRect, app){
	PhysObjFX.call(this, physRect, app);
};

utils.inherit(PhysRectFX, PhysObjFX);

PhysRectFX.prototype._buildGraphic = function(){
	var w = this.physObj.width,
		h = this.physObj.height;

	this.graphic = new PIXI.Graphics();
	this.graphic.beginFill(this.physObj.color);
	this.graphic.drawRect(0, 0, w, h);
	this.graphic.endFill();
	this.graphic.pivot._x = w/2;
	this.graphic.pivot._y = h/2;
};

module.exports = PhysRectFX;