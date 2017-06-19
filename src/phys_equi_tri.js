var Vector2D = require("./math/vector2d.js");
var Polygon = require("./math/polygon.js");
var PhysObj = require("./phys_obj.js");
var utils = require("./utils.js");

var PhysEquiTri = function(id, pos, edgeLen, color){
	this.edgeLen = edgeLen;
	this.centerToTop = ((1/2)*this.edgeLen)/Math.cos(Math.PI/6);
	this.centerToBot = (1/2)*this.edgeLen*Math.tan(Math.PI/6);

	var offsets = [
			new Vector2D(0, -this.centerToTop),
			new Vector2D(this.edgeLen/2, this.centerToBot),
			new Vector2D(-this.edgeLen/2, this.centerToBot)
		];

	PhysObj.call(this, id, new Polygon(pos, offsets, 0), color);
};

utils.inherit(PhysEquiTri, PhysObj);

module.exports = PhysEquiTri;