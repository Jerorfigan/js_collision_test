var R = require("../../lib/ramda.min.js");
var settings = require("../settings.js");
var PhysRectFX = require("./PhysRectFX.js"); 
var PhysEquiTriFX = require("./PhysEquiTriFX.js");
var PhysRegPolyFX = require("./PhysRegPolyFX.js")

var FX = function(){
	this.app = new PIXI.Application(settings.renderSpace.width, settings.renderSpace.height, { antialias: true });
	this.actors = [];
	this.actorsByID = {};
	
	// Add render target to DOM
	document.body.appendChild(this.app.view);

	initStage.call(this);
	initEvents.call(this);
};

FX.prototype.draw = function(gameState){
	var thisObj = this;
	R.forEach(function(drawable){
		if(thisObj.actorsByID[drawable.b.id]){
			thisObj.actorsByID[drawable.b.id].update(drawable);
		}else{
			var newActor = null;
			switch(drawable.constructor.name){
				case "PhysRect":
					newActor = new PhysRectFX(drawable, thisObj.app);
					break;
				case "PhysEquiTri":
					newActor = new PhysEquiTriFX(drawable, thisObj.app);
					break;
				case "PhysRegPoly":
					newActor = new PhysRegPolyFX(drawable, thisObj.app);
					break;
				default:
					throw "Unknown drawable type: " + drawable.constructor.name;
			}
			thisObj.actors.push(newActor);
			thisObj.actorsByID[drawable.b.id] = newActor;
		}
	}, gameState.drawables);
};

module.exports = FX;

// PRIVATE FUNCTIONS //

function initStage(){
	// Initialize scale
	this.app.stage.scale.x = settings.renderSpace.width/settings.logicSpace.width;
	this.app.stage.scale.y = settings.renderSpace.height/settings.logicSpace.height;

	// Initialize z-index containers
	for(var zIndex = 0; zIndex < settings.zBufferCnt; zIndex++){
		this.app.stage.addChild(new PIXI.Container());
	}
}

function initEvents(){
	var thisObj = this;
	this.app.view.onpointermove = function(e){
		R.forEach(function(actor){
			if(actor.fxb.interaction.dragable){
				actor.onDrag(e);
			}
		}, thisObj.actors);
	};
	window.onkeypress = function(e){
		R.forEach(function(actor){
			if(actor.fxb.interaction.respondsToKeypress){
				actor.onKeypress(e);
			}
		}, thisObj.actors);
	};
}