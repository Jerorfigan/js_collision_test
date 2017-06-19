var R = require("../../lib/ramda.min.js");

var Polygon = function(center, offsets, rotation){
	this.center = center;
	this.offsets = offsets;
	this.rotation = rotation;
};

Polygon.prototype.getVerts = function(){
	thisObj = this;
	return R.map(function(offset){ return offset.rotate(thisObj.rotation).add(thisObj.center); }, this.offsets);
};

module.exports = Polygon;