var R = require("../../lib/ramda.min.js");

var Physics2D = function(){
	
};

Physics2D.prototype.arePolygonsColliding = function(polygon1, polygon2){
	
	function getNormals(verts){
		var normals = [];
		for(var i = 0; i < verts.length; i++){
			i < verts.length - 1 ? 
				normals.push(verts[i].sub(verts[i+1]).rotate(Math.PI/2).normalize()) :
				normals.push(verts[i].sub(verts[0]).rotate(Math.PI/2).normalize());
		}
		return normals;
	}

	var arePolysColliding = true,
		poly1Verts = polygon1.getVerts(),
		poly2Verts = polygon2.getVerts(),
		maxVertCnt = Math.max(poly1Verts.length, poly2Verts.length),
		normals = getNormals(poly1Verts).concat(getNormals(poly2Verts));

	for(var i = 0; i < normals.length; i++){
		var projections = [[],[]];
		for(var j = 0; j < maxVertCnt; j++){
			j < poly1Verts.length ? projections[0].push(poly1Verts[j].dot(normals[i])) : 0;
			j < poly2Verts.length ? projections[1].push(poly2Verts[j].dot(normals[i])) : 0;
		}
		// Find projection min and max bounds for each polygon
		var minBoundPoly1 = R.reduce(function(acc, val){ return val < acc ? val : acc; }, projections[0][0], projections[0]),
			maxBoundPoly1 = R.reduce(function(acc, val){ return val > acc ? val : acc; }, projections[0][0], projections[0]),
			minBoundPoly2 = R.reduce(function(acc, val){ return val < acc ? val : acc; }, projections[1][0], projections[1]),
			maxBoundPoly2 = R.reduce(function(acc, val){ return val > acc ? val : acc; }, projections[1][0], projections[1]);

		if(
			// No overlap
			!(
				// Conditions for overlapping projection bounds

				// min projection bound of poly1 is inside poly2 projection bounds
				(minBoundPoly1 >= minBoundPoly2 && minBoundPoly1 <= maxBoundPoly2) ||
				// max projection bound of poly1 is inside poly2 projection bounds
				(maxBoundPoly1 >= minBoundPoly2 && maxBoundPoly1 <= maxBoundPoly2) ||
				// poly1's projection bounds contain poly2's
				(minBoundPoly1 <= minBoundPoly2 && maxBoundPoly1 >= maxBoundPoly2)
			)
		){
			arePolysColliding = false;
			break;
		}
	}

	return arePolysColliding;
};

module.exports = new Physics2D();