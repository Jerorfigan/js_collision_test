var R = require("../lib/ramda.min.js");

var EventManager = function(){
	this._events = {};
};

EventManager.prototype.create = function(eventName){
	if(this._events[eventName]) throw "Attempt to create event with duplicate key";
	this._events[eventName] = {
		subscribers: []
	};
};

EventManager.prototype.subscribe = function(eventName, callback, context){
	if(!this._events[eventName]) throw "Unknown event";
	this._events[eventName].subscribers.push({
		callback: callback,
		context: context
	});
};

EventManager.prototype.fire = function(eventName, data){
	if(!this._events[eventName]) throw "Unknown event";
	R.forEach(function(subscriber){
		subscriber.callback.call(subscriber.context, eventName, data);
	}, this._events[eventName].subscribers);
};

var evtMgr = new EventManager;

evtMgr.create("PhysRectStartedBeingDragged");
evtMgr.create("PhysRectBeingDragged");
evtMgr.create("PhysRectStoppedBeingDragged");
evtMgr.create("PhysRectRotatedClockwise");
evtMgr.create("PhysRectRotatedCounterClockwise");

module.exports = evtMgr;