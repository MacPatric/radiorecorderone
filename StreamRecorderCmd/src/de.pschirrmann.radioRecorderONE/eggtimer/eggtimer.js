"use strict";

const EventEmitter = require("events").EventEmitter;

/**
 * MinutesEggTimer extends EventEmitter
 * will emit "0" when the clock reaches 0
 * 
 */
class MinutesEggTimer extends EventEmitter {	
	constructor(timeInMinutes) {
		super();
		this.timeInMinutes = timeInMinutes;
	}
	
	start() {
		console.log("starting timer timeout (" + this.getTimeInMillis() + ")...");
		this.timeout = setTimeout(this.stop.bind(this), this.getTimeInMillis());		
		// note: function as argument without () (with parenthesis, the function gets called immediately)
		// also note: binding at this execution context through .bind(this)
	}		
	
	getTimeInMillis() {
		return this.timeInMinutes*60*1000;
	}
	
	stop() {
		// if stop() was not called from timeOut, clear the timeout (stop the clock)
		clearTimeout(this.timeout);			
		this.emit("0");
	}
}

// export API
module.exports = MinutesEggTimer;

