var FXBasics = require("./fx_basics.js");
var fxutils = require("./fx_utils.js");
var settings = require("../settings.js");

var PhysRectFX = function(physRect, app){
	this.fxb = new FXBasics();
	this.fxb.interaction.dragable = true;
	this.app = app;
	this.physRect = physRect;
	this.graphic = null;
	this.isBeingDragged = false;

	_buildGraphics.call(this);
};

PhysRectFX.prototype.onDrag = function(e){
	var x = e.clientX,
		y = e.clientY,
		canvasLeftBoundaryX = this.app.view.getBoundingClientRect().left,
		canvasTopBoundaryY = this.app.view.getBoundingClientRect().top;

	if(this.isBeingDragged){
		this.app.stage.removeChild(this.graphic);
		this.app.stage.addChild(this.graphic);
		// TODO: consider revising this, I think it should be emitting event to logical object to have it update its
		// logical position first and then have that change trickle down to graphics, rather than graphics superceding
		// logic.
		this.graphic.x = x - canvasLeftBoundaryX;
		this.graphic.y = y - canvasTopBoundaryY;
		this.physRect.x = this.graphic.x * settings.logicSpace.width / settings.renderSpace.width;
		this.physRect.y = this.graphic.y * settings.logicSpace.height / settings.renderSpace.height;
	}
};

PhysRectFX.prototype.update = function(physRect){
	// Update position
	/*var renderPos = fxutils.logicV2renderV(this.physRect.pos);
	this.graphic.x = renderPos.x;
	this.graphic.y = renderPos.y;*/
};

module.exports = PhysRectFX;

function _buildGraphics(){
	var id = this.physRect.b.id;
		w = fxutils.logicW2renderW(this.physRect.width),
		h = fxutils.logicH2renderH(this.physRect.height);

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