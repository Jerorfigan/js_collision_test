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
	this.zIndex = 0;

	evtMgr.subscribe("PhysRectStartedBeingDragged", onStartedBeingDragged, this);
	evtMgr.subscribe("PhysRectBeingDragged", onBeingDragged, this);
	evtMgr.subscribe("PhysRectStoppedBeingDragged", onStoppedBeingDragged, this);
};

PhysRect.prototype.update = function(){

};

PhysRect.prototype.getRenderState = function(){
	return this;
};

module.exports = PhysRect;

// EVENTS //

function onStartedBeingDragged(evt, data){
	if(data.id == this.b.id){
		this.zIndex = 1;
	}
}

function onBeingDragged(evt, data){
	if(data.id == this.b.id){
		this.pos = data.pos;
	}
}

function onStoppedBeingDragged(evt, data){
	if(data.id == this.b.id){
		this.zIndex = 0;
	}
}