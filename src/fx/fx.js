var R = require("../../lib/ramda.min.js");
var settings = require("../settings.js");
var PhysRectFX = require("./PhysRectFX.js"); 

var FX = function(){
	this.app = new PIXI.Application(settings.renderSpace.width, settings.renderSpace.height, { antialias: true });
	this.actors = [];
	this.actorsByID = {};
	
	// Add render target to DOM
	document.body.appendChild(this.app.view);

	// EVENTS

	var thisObj = this;
	this.app.view.onpointermove = function(e){
		R.forEach(function(actor){
			if(actor.fxb.interaction.dragable){
				actor.onDrag(e);
			}
		}, thisObj.actors);
	};
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
				default:
					throw "Unknown drawable type";
			}
			thisObj.actors.push(newActor);
			thisObj.actorsByID[drawable.b.id] = newActor;
		}
	}, gameState.drawables);
};

module.exports = FX;