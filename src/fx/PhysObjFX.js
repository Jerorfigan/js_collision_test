var FXBasics = require("./fx_basics.js");
var fxutils = require("./fx_utils.js");
var settings = require("../settings.js");
var evtMgr = require("../event_manager.js");
var Vector2D = require("../math/Vector2D.js");

var PhysObjFX = function(physObj, app){
	// Init basics
	this.fxb = new FXBasics(physObj.b.id);
	this.fxb.interaction.dragable = true;
	this.fxb.interaction.respondsToKeypress = true;
	// Init props
	this.app = app;
	this.physObj = physObj;
	this.graphic = null;
	this.isBeingDragged = false;

	_initGraphics.call(this);
};

PhysObjFX.prototype.update = function(updatedPhysObj){
	// If we need to update color, we need to redraw graphic
	if(this.physObj.color != updatedPhysObj.color){
		this.physObj = updatedPhysObj;
		_initGraphics.call(this);
	}else{ // Else only need to update certain graphic props
		// Update position
		this.graphic.x = updatedPhysObj.polygon.center.x;
		this.graphic.y = updatedPhysObj.polygon.center.y;

		// Update rotation
		this.graphic.rotation = updatedPhysObj.polygon.rotation;

		// Update graphic z-index if it has changed
		if(this.physObj.zIndex != updatedPhysObj.zIndex){
			// Move graphic to correct z-index container
			var oldZIndexContainer = this.app.stage.getChildAt(this.physObj.zIndex);
			oldZIndexContainer.removeChild(this.graphic);
			var newZIndexContainer = this.app.stage.getChildAt(updatedPhysObj.zIndex);
			newZIndexContainer.addChild(this.graphic);
		}

		this.physObj = updatedPhysObj;
	}
};

// EVENTS //

PhysObjFX.prototype.onDrag = function(e){
	var renderDragPos = 
		new Vector2D(
			e.clientX - this.app.view.getBoundingClientRect().left, 
			e.clientY - this.app.view.getBoundingClientRect().top
		),
		logicDragPos = fxutils.renderV2logicV(renderDragPos);    

	if(this.isBeingDragged){
		evtMgr.fire("PhysObjBeingDragged", {id: this.fxb.id, pos: logicDragPos});
	}
};

PhysObjFX.prototype.onKeypress = function(e){
	if(this.isBeingDragged){
		if(String.fromCharCode(e.charCode).toLowerCase() == settings.rotateCounterClockwiseKey){
			evtMgr.fire("PhysObjRotatedCounterClockwise", {id: this.fxb.id });
		}else if(String.fromCharCode(e.charCode).toLowerCase() == settings.rotateClockwiseKey){
			evtMgr.fire("PhysObjRotatedClockwise", {id: this.fxb.id });
		}
	}
};

// PROTECTED ROUTINES //

PhysObjFX.prototype._buildGraphic = function(){
	// To be implemented by inheriting class
	throw "_buildGraphic not implemented";
};

module.exports = PhysObjFX;

function _initGraphics(){
	// Detroy current graphic if there is one
	if(this.graphic){
		var zIndexContainer = this.app.stage.getChildAt(this.physObj.zIndex);
		zIndexContainer.removeChild(this.graphic);
	}

	this._buildGraphic();

	// Set graphic rotation
	this.graphic.rotation = this.physObj.polygon.rotation;

	// Set graphic position
	this.graphic.x = this.physObj.polygon.center.x;
	this.graphic.y = this.physObj.polygon.center.y;

	// Setup interaction hooks
	if(this.physObj.b.interactive){
		this.graphic.interactive = true;
		var thisObj = this;
		this.graphic.on("pointerdown", function(e){
			thisObj.isBeingDragged = true;
			evtMgr.fire("PhysObjStartedBeingDragged", {id: thisObj.fxb.id });
		});
		this.graphic.on("pointerup", function(e){
			thisObj.isBeingDragged = false;
			evtMgr.fire("PhysObjStoppedBeingDragged", {id: thisObj.fxb.id });
		});
	}

	// Add graphic to z-index container corresponding to its z-index
	var zIndexContainer = this.app.stage.getChildAt(this.physObj.zIndex);
	zIndexContainer.addChild(this.graphic);
}