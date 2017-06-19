var Basics = require("./basics.js");
var evtMgr = require("./event_manager.js");
var settings = require("./settings.js");
var utils = require("./utils.js");
var R = require("../lib/ramda.min.js");

var PhysObj = function(id, polygon, color){
	this.b = new Basics(id);
	this.polygon = polygon;
	this.color = color;
	this.zIndex = 0;

	// Drag events
	evtMgr.subscribe("PhysObjStartedBeingDragged", onStartedBeingDragged, this);
	evtMgr.subscribe("PhysObjBeingDragged", onBeingDragged, this);
	evtMgr.subscribe("PhysObjStoppedBeingDragged", onStoppedBeingDragged, this);
	// Rotation events
	evtMgr.subscribe("PhysObjRotatedClockwise", onRotation, this);
	evtMgr.subscribe("PhysObjRotatedCounterClockwise", onRotation, this);
};

PhysObj.prototype.update = function(){
	// To be implemented by inheriting class
};

PhysObj.prototype.getRenderState = function(){
	return R.clone(this);
};

PhysObj.prototype.getVerts = function(){
	return this.polygon.getVerts();
};

module.exports = PhysObj;

// EVENTS //
 
// Drag events //
function onStartedBeingDragged(evt, data){
	if(data.id == this.b.id){
		this.zIndex = 1;
	}
}

function onBeingDragged(evt, data){
	if(data.id == this.b.id){
		this.polygon.center = data.pos;
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
		this.polygon.rotation = 
			evt == "PhysObjRotatedClockwise" ? 
			(this.polygon.rotation + settings.deltaRadOnRotate) % (2*Math.PI) :
			(this.polygon.rotation - settings.deltaRadOnRotate) % (2*Math.PI);
	}
}