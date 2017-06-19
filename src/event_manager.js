var R = require("../lib/ramda.min.js");

var EventManager = function(){
	this._events = {};
};

EventManager.prototype.create = function(eventName){
	if(this._events[eventName]){
		throw "Attempt to create event with duplicate key: " + eventName;
	}
	this._events[eventName] = {
		subscribers: []
	};
};

EventManager.prototype.subscribe = function(eventName, callback, context){
	if(!this._events[eventName]){
		throw "Unknown event:" + eventName;
	}
	this._events[eventName].subscribers.push({
		callback: callback,
		context: context
	});
};

EventManager.prototype.fire = function(eventName, data){
	if(!this._events[eventName]){
		throw "Unknown event:" + eventName;
	}
	R.forEach(function(subscriber){
		subscriber.callback.call(subscriber.context, eventName, data);
	}, this._events[eventName].subscribers);
};

var evtMgr = new EventManager;

evtMgr.create("PhysObjStartedBeingDragged");
evtMgr.create("PhysObjBeingDragged");
evtMgr.create("PhysObjStoppedBeingDragged");
evtMgr.create("PhysObjRotatedClockwise");
evtMgr.create("PhysObjRotatedCounterClockwise");

module.exports = evtMgr;