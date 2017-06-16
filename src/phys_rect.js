var Basics = require("./basics.js");
var Vector2D = require("./math/vector2d.js");
var evtMgr = require("./event_manager.js");
var settings = require("./settings.js");

var PhysRect = function(id, pos, width, height, color){
	this.b = new Basics(id);

	this.pos = pos;
	this.width = width;
	this.height = height;
	this.color = color;
	this.interactive = true;
	this.zIndex = 0;
	this.rotation = 0;

	// Drag events
	evtMgr.subscribe("PhysRectStartedBeingDragged", onStartedBeingDragged, this);
	evtMgr.subscribe("PhysRectBeingDragged", onBeingDragged, this);
	evtMgr.subscribe("PhysRectStoppedBeingDragged", onStoppedBeingDragged, this);
	// Rotation events
	evtMgr.subscribe("PhysRectRotatedClockwise", onRotation, this);
	evtMgr.subscribe("PhysRectRotatedCounterClockwise", onRotation, this);
};

PhysRect.prototype.update = function(){

};

PhysRect.prototype.getRenderState = function(){
	return this;
};

module.exports = PhysRect;

// EVENTS //
 
// Drag events //
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

// Rotation events //
function onRotation(evt, data){
	if(data.id == this.b.id){
		this.rotation = 
			evt == "PhysRectRotatedClockwise" ? 
			(this.rotation + settings.deltaRadOnRotate) % (2*Math.PI) :
			(this.rotation - settings.deltaRadOnRotate) % (2*Math.PI);
	}
}