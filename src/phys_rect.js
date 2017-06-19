var Vector2D = require("./math/vector2d.js");
var Polygon = require("./math/polygon.js");
var PhysObj = require("./phys_obj.js");
var utils = require("./utils.js");

var PhysRect = function(id, pos, width, height, color){
	this.width = width;
	this.height = height;

	var offsets = [
		new Vector2D(-this.width/2, -this.height/2),
		new Vector2D(this.width/2, -this.height/2),
		new Vector2D(this.width/2, this.height/2),
		new Vector2D(-this.width/2, this.height/2)
	];

	PhysObj.call(this, id, new Polygon(pos, offsets, 0), color);
};

utils.inherit(PhysRect, PhysObj);

module.exports = PhysRect;