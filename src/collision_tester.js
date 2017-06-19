var R = require("../lib/ramda.min.js");
var PhysRect = require("./phys_rect.js");
var PhysEquiTri = require("./phys_equi_tri.js");
var PhysRegPoly = require("./phys_reg_poly.js");
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
		new PhysRegPoly("poly1", new Vector2D(settings.logicSpace.width/3, settings.logicSpace.height/2), 6, 100, 0xFF0000)
	);
	this.gameState.addObj(
		new PhysEquiTri("tri1", new Vector2D(settings.logicSpace.width * 2/3, settings.logicSpace.height/2), 200, 0xFF0000)
	);
};

CollisionTester.prototype.update = function(){
	R.forEach(function(updatable){
		updatable.update();
	}, this.gameState.getObjOfType(GameState.prototype.OBJ_TYPE.UPDATEABLE));

	// Check for collision between poly1 and rect2
	var poly1 = this.gameState.getObjByKey("poly1"),
		tri1 = this.gameState.getObjByKey("tri1");
	if(
		phys2D.arePolygonsColliding(
			poly1, 
			tri1
		)
	){
		poly1.color = 0x00FFFF;
		tri1.color = 0x00FFFF;
	}else{
		poly1.color = 0xFF0000;
		tri1.color = 0xFF0000;
	}
};

CollisionTester.prototype.draw = function(){
	this.fx.draw(this.gameState.packageForRendering());
};

module.exports = CollisionTester;