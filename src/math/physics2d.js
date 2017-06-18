var R = require("../../lib/ramda.min.js");

var Physics2D = function(){
	
};

Physics2D.prototype.areObjectsColliding = function(physRect1, physRect2){
	var areObjectsColliding = true,
		rect1Verts = physRect1.getVerts(),
		rect2Verts = physRect2.getVerts(),
		rectNorms = [
			rect1Verts[0].sub(rect1Verts[1]).rotate(Math.PI/2).normalize(),
			rect1Verts[1].sub(rect1Verts[2]).rotate(Math.PI/2).normalize(),
			rect2Verts[0].sub(rect2Verts[1]).rotate(Math.PI/2).normalize(),
			rect2Verts[1].sub(rect2Verts[2]).rotate(Math.PI/2).normalize()
		];

	for(var i = 0; i < rectNorms.length; i++){
		var projections = [[],[]];
		for(var j = 0; j < rect1Verts.length; j++){
			projections[0].push(rect1Verts[j].dot(rectNorms[i]));
			projections[1].push(rect2Verts[j].dot(rectNorms[i]));
		}
		var minProjectionRect1 = R.reduce(function(acc, val){ return val < acc ? val : acc; }, projections[0][0], projections[0]),
			maxProjectionRect1 = R.reduce(function(acc, val){ return val > acc ? val : acc; }, projections[0][0], projections[0]),
			minProjectionRect2 = R.reduce(function(acc, val){ return val < acc ? val : acc; }, projections[1][0], projections[1]),
			maxProjectionRect2 = R.reduce(function(acc, val){ return val > acc ? val : acc; }, projections[1][0], projections[1]);

		if(
			// No overlap
			!(
				// Conditions for overlapping bounds

				// min projection bound of rect1 is inside rect2 projection bounds
				(minProjectionRect1 >= minProjectionRect2 && minProjectionRect1 <= maxProjectionRect2) ||
				// max projection bound of rect1 is inside rect2 projection bounds
				(maxProjectionRect1 >= minProjectionRect2 && maxProjectionRect1 <= maxProjectionRect2) ||
				// rect1's projection bounds contain rect2's
				(minProjectionRect1 <= minProjectionRect2 && maxProjectionRect1 >= maxProjectionRect2)
			)
		){
			areObjectsColliding = false;
			break;
		}
	}

	return areObjectsColliding;
};

module.exports = new Physics2D();