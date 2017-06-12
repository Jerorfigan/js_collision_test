var R = require("../lib/ramda.min.js");

var GameState = function(){
	this.objs = [];
};

// ENUMS
GameState.prototype.OBJ_TYPE = {
	UPDATEABLE: 1,
	DRAWABLE: 2
};

GameState.prototype.addObj = function(obj){
	this.objs.push(obj);
};

GameState.prototype.getObjOfType = function(type){
	return R.filter(function(obj){
		switch(type){
			case GameState.prototype.OBJ_TYPE.UPDATEABLE:
				return obj.b.reqUpdate;
			break;
			case GameState.prototype.OBJ_TYPE.DRAWABLE:
				return obj.b.reqDraw;
			break;
			default: throw "Unknown object type";
		}
	}, this.objs);
};

GameState.prototype.packageForRendering = function(){
	return {
		drawables: R.map(
			function(drawable){ return drawable.getRenderState(); }, 
			this.getObjOfType(GameState.prototype.OBJ_TYPE.DRAWABLE)
		)
	};
};

module.exports = GameState;