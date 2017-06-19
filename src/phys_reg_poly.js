var Vector2D = require("./math/vector2d.js");
var Polygon = require("./math/polygon.js");
var PhysObj = require("./phys_obj.js");
var utils = require("./utils.js");

var PhysRegPoly = function(id, pos, numSides, boundingCircleRadius, color){
	this.numSides = numSides;
	var offsets = [new Vector2D(0, -boundingCircleRadius)],
		deltaRad = (2*Math.PI)/this.numSides;
	for(var i = 1; i < numSides; i++){
		offsets.push(offsets[offsets.length-1].rotate(deltaRad));
	}

	PhysObj.call(this, id, new Polygon(pos, offsets, 0), color);
};

utils.inherit(PhysRegPoly, PhysObj);

module.exports = PhysRegPoly;