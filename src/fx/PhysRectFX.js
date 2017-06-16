var FXBasics = require("./fx_basics.js");
var fxutils = require("./fx_utils.js");
var settings = require("../settings.js");
var evtMgr = require("../event_manager.js");
var Vector2D = require("../math/Vector2D.js");

var PhysRectFX = function(physRect, app){
	this.fxb = new FXBasics(physRect.b.id);
	this.fxb.interaction.dragable = true;
	this.app = app;
	this.physRect = physRect;
	this.graphic = null;
	this.isBeingDragged = false;

	_buildGraphics.call(this);
};

PhysRectFX.prototype.onDrag = function(e){
	var renderDragPos = 
		new Vector2D(
			e.clientX - this.app.view.getBoundingClientRect().left, 
			e.clientY - this.app.view.getBoundingClientRect().top
		),
		logicDragPos = fxutils.renderV2logicV(renderDragPos);    

	if(this.isBeingDragged){
		evtMgr.fire("PhysRectDragged", {id: this.fxb.id, pos: logicDragPos});
	}
};

PhysRectFX.prototype.update = function(physRect){
	// Update position
	var renderPos = fxutils.logicV2renderV(this.physRect.pos);
	this.graphic.x = renderPos.x;
	this.graphic.y = renderPos.y;
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
	this.graphic.endFill();

	if(this.physRect.interactive){
		this.graphic.interactionID = id;
		this.graphic.interactive = true;
		var thisObj = this;
		this.graphic.on("pointerdown", function(e){
			console.log(e.target.interactionID + " is being dragged.");
			thisObj.isBeingDragged = true;
		});
		this.graphic.on("pointerup", function(e){
			console.log(e.target.interactionID + " has stopped being dragged.");
			thisObj.isBeingDragged = false;
		});
	}

	this.app.stage.addChild(this.graphic);
}