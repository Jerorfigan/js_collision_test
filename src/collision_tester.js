var R = require("../lib/ramda.min.js");
var PhysRect = require("./phys_rect.js");
var GameState = require("./game_state.js");
var Vector2D = require("./math/vector2d.js");
var settings = require("./settings.js");
var FX = require("./fx/FX.js");
var phys2D = require("./math/physics2d.js");

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
		new PhysRect("rect2", new Vector2D(settings.logicSpace.width * 2/3, settings.logicSpace.height/2), 100, 200, 0xFF0000)
	);
};

CollisionTester.prototype.update = function(){
	R.forEach(function(updatable){
		updatable.update();
	}, this.gameState.getObjOfType(GameState.prototype.OBJ_TYPE.UPDATEABLE));

	// Check for collision between rect1 and rect2
	var rect1 = this.gameState.getObjByKey("rect1"),
		rect2 = this.gameState.getObjByKey("rect2");
	if(
		phys2D.arePolygonsColliding(
			rect1, 
			rect2
		)
	){
		rect1.color = 0x00FFFF;
		rect2.color = 0x00FFFF;
	}else{
		rect1.color = 0xFF0000;
		rect2.color = 0xFF0000;
	}
};

CollisionTester.prototype.draw = function(){
	this.fx.draw(this.gameState.packageForRendering());
};

module.exports = CollisionTester;