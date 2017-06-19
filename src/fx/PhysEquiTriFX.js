var utils = require("../utils.js");
var PhysObjFX = require("./PhysObjFX");

var PhysEquiTriFX = function(physEquiTri, app){
	PhysObjFX.call(this, physEquiTri, app);
};

utils.inherit(PhysEquiTriFX, PhysObjFX);

PhysEquiTriFX.prototype._buildGraphic = function(){
	var offsets = this.physObj.polygon.offsets;

	this.graphic = new PIXI.Graphics();
	this.graphic.beginFill(this.physObj.color);
	this.graphic.moveTo(offsets[0].x, offsets[0].y);
	for(var i = 1; i < offsets.length; i++){
		this.graphic.lineTo(offsets[i].x, offsets[i].y);
	}
	this.graphic.lineTo(offsets[0].x, offsets[0].y);
	this.graphic.endFill();
	this.graphic.pivot._x = 0;
	this.graphic.pivot._y = 0;
};

module.exports = PhysEquiTriFX;