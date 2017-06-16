var Basics = require("./basics.js");
var Vector2D = require("./math/vector2d.js");
var evtMgr = require("./event_manager.js");

var PhysRect = function(id, pos, width, height, color){
	this.b = new Basics(id);

	this.pos = pos;
	this.width = width;
	this.height = height;
	this.color = color;
	this.interactive = true;

	evtMgr.subscribe("PhysRectDragged", this.onBeingDragged, this);
};

PhysRect.prototype.update = function(){

};

PhysRect.prototype.getRenderState = function(){
	return this;
};

// EVENTS //

PhysRect.prototype.onBeingDragged = function(evt, data){
	if(data.id == this.b.id){
		this.pos = data.pos;
	}
};

module.exports = PhysRect;