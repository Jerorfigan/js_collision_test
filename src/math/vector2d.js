var Vector2D = function(x, y){
	this.x = x;
	this.y = y;
};

Vector2D.prototype.add = function(vect){
	return new Vector2D(this.x + vect.x, this.y + vect.y);
};

Vector2D.prototype.sub = function(vect){
	return new Vector2D(this.x - vect.x, this.y - vect.y);
};

Vector2D.prototype.dot = function(vect){
	return this.x * vect.x + this.y * vect.y;
};

Vector2D.prototype.rotate = function(rad){
	return new Vector2D(
			this.x * Math.cos(rad) - this.y * Math.sin(rad),
			this.y * Math.cos(rad) + this.x * Math.sin(rad)
		);
};

Vector2D.prototype.normalize = function(){
	var mag = this.mag();
	return new Vector2D(this.x/mag, this.y/mag);
};

Vector2D.prototype.mag = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

module.exports = Vector2D;