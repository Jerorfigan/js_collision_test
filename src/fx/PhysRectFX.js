var FXBasics = require("./fx_basics.js");
var fxutils = require("./fx_utils.js");
var settings = require("../settings.js");
var evtMgr = require("../event_manager.js");
var Vector2D = require("../math/Vector2D.js");

var PhysRectFX = function(physRect, app){
	this.fxb = new FXBasics(physRect.b.id);
	this.fxb.interaction.dragable = true;
	this.fxb.interaction.respondsToKeypress = true;

	this.app = app;
	this.physRect = physRect;
	this.graphic = null;
	this.isBeingDragged = false;
	this.zIndex = physRect.zIndex;

	_buildGraphics.call(this);
};

PhysRectFX.prototype.update = function(physRect){
	// Update position
	var renderPos = fxutils.logicV2renderV(this.physRect.pos);
	this.graphic.x = renderPos.x;
	this.graphic.y = renderPos.y;

	// Update rotation
	this.graphic.rotation = physRect.rotation;

	// Update z-index if it has changed
	if(this.zIndex != physRect.zIndex){
		var oldZIndexContainer = this.app.stage.getChildAt(this.zIndex);
		oldZIndexContainer.removeChild(this.graphic);
		var newZIndexContainer = this.app.stage.getChildAt(physRect.zIndex);
		newZIndexContainer.addChild(this.graphic);
		this.zIndex = physRect.zIndex;
	}
};

// EVENTS //

PhysRectFX.prototype.onDrag = function(e){
	var renderDragPos = 
		new Vector2D(
			e.clientX - this.app.view.getBoundingClientRect().left, 
			e.clientY - this.app.view.getBoundingClientRect().top
		),
		logicDragPos = fxutils.renderV2logicV(renderDragPos);    

	if(this.isBeingDragged){
		evtMgr.fire("PhysRectBeingDragged", {id: this.fxb.id, pos: logicDragPos});
	}
};

PhysRectFX.prototype.onKeypress = function(e){
	if(this.isBeingDragged){
		if(String.fromCharCode(e.charCode).toLowerCase() == settings.rotateCounterClockwiseKey){
			evtMgr.fire("PhysRectRotatedCounterClockwise", {id: this.fxb.id });
		}else if(String.fromCharCode(e.charCode).toLowerCase() == settings.rotateClockwiseKey){
			evtMgr.fire("PhysRectRotatedClockwise", {id: this.fxb.id });
		}
	}
};

module.exports = PhysRectFX;

function _buildGraphics(){
	var id = this.physRect.b.id;
		w = fxutils.logicX2renderX(this.physRect.width),
		h = fxutils.logicY2renderY(this.physRect.height);

	this.graphic = new PIXI.Graphics();

	this.graphic.beginFill(this.physRect.color);
	this.graphic.drawRect(0, 0, w, h);
	this.graphic.pivot._x = w/2;
	this.graphic.pivot._y = h/2;
	var renderPos = fxutils.logicV2renderV(this.physRect.pos);
	this.graphic.x = renderPos.x;
	this.graphic.y = renderPos.y;
	this.graphic.rotation = this.physRect.rotation;
	this.graphic.endFill();

	if(this.physRect.interactive){
		this.graphic.interactionID = id;
		this.graphic.interactive = true;
		var thisObj = this;
		this.graphic.on("pointerdown", function(e){
			thisObj.isBeingDragged = true;
			evtMgr.fire("PhysRectStartedBeingDragged", {id: thisObj.fxb.id });
		});
		this.graphic.on("pointerup", function(e){
			thisObj.isBeingDragged = false;
			evtMgr.fire("PhysRectStoppedBeingDragged", {id: thisObj.fxb.id });
		});
	}

	var zIndexContainer = this.app.stage.getChildAt(this.physRect.zIndex);
	zIndexContainer.addChild(this.graphic);
}