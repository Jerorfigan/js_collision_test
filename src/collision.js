var CollisionTester = require("./collision_tester.js");
var settings = require("./settings.js");

window.onload = function(){

	// Setup request animation pollfill if needed
	function requestAnimPolyfill(func) {
        var currTime = (new Date()).getTime();
        var timeToWait = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { func(currTime + timeToWait); }, timeToWait);
        lastTime = currTime + timeToWait;
        return id;
    }

    (function() {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimPolyfill;
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    // Setup the game object as a global singleton.
    (function(){
        var Driver = function(){
            this.lastUpdateTime = 0;
        };

        Driver.prototype.start = function(){
            this.init();
            this.loop(0);
        };
        Driver.prototype.init = function(){
            this.mgr = new CollisionTester();
        };
        Driver.prototype.loop = function(currTime){
            var driver = this;
            var deltaTime = currTime - this.lastUpdateTime;
            if(deltaTime >= settings.framePeriod){
                this.mgr.update();
                this.mgr.draw();
                this.lastUpdateTime = currTime;
            }
            window.requestAnimationFrame(function(currTime){
                Driver.prototype.loop.call(driver, currTime);
            });
        };

        var driver = new Driver();
        driver.start();
    })();
};