var Utils = function(){
	
};

Utils.prototype.inherit = function(child, parent) {
	function cloneProto(object){
		function DummyConstructor() {}
	    DummyConstructor.prototype = object;
	    return new DummyConstructor();
	}
    var prototype = cloneProto(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
};

module.exports = new Utils();