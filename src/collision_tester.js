var R = require("../lib/ramda.min.js");
var PhysRect = require("./phys_rect.js");
var GameState = require("./game_state.js");
var Vector2D = require("./math/vector2D.js");
var settings = require("./settings.js");
var FX = require("./fx/FX.js");

var CollisionTester = function(){
	this.fx = new FX();
	this.gameState = new GameState();

	this.init();
};

CollisionTester.prototype.init = function(){
	this.gameState.addObj(
		new PhysRect("rect1", new Vector2D(settings.logicSpace.width/3, settings.logicSpace.height/2), 100, 200, 0xFF0000)
	);
	this.gameState.addObj(
		new PhysRect("rect2", new Vector2D(settings.logicSpace.width * 2/3, settings.logicSpace.height/2), 100, 200, 0x00FF00)
	);
};

CollisionTester.prototype.update = function(){
	R.forEach(function(updatable){
		updatable.update();
	}, this.gameState.getObjOfType(GameState.prototype.OBJ_TYPE.UPDATEABLE));
};

CollisionTester.prototype.draw = function(){
	this.fx.draw(this.gameState.packageForRendering());
};

module.exports = CollisionTester;