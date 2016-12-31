"use strict";

const fs = require("fs");
const EventEmitter = require("events").EventEmitter;
const http = require("http");
const MinutesEggTimer = require("../eggtimer");
const HttpError = require("../exceptions").HttpError;

/**
 * StreamRecorder will open the given mp3 url
 * and write the readstream to a file as a writestream.
 * When the Timer with the timeInMinutes arg as duration 
 * finishes, he will emit "0". Streams will be closed then.
 */
class StreamRecorder extends EventEmitter {

	// class properties must be methods

	constructor(radioUrl, timeInMinutes, filename) {
		console.log("new StreamRecorder " +  radioUrl + ", " + timeInMinutes + ", " + filename);
		super();

		this.recording = false;
		this.radioUrl = radioUrl;
		this.filename = filename;

		this.timer = new MinutesEggTimer(timeInMinutes);
		// register for the "0" from the MinutesEggTimer
		this.timer.on("0", this.stop.bind(this)); // note: binding at this execution context through .bind(this)			
	}

	isRecording() {
		return this.recording;
	}

	/**
	 * calls http.get(his.radioUrl).
	 * In case of an error, the error is thrown.
	 */
	record() {
		console.log('opening radioUrl:', this.radioUrl);
		http.get(this.radioUrl, this.connectStreams.bind(this))
			.on("error", (e) => {
				console.error(e);
				throw(e);
			});
	}

	stop() {
		console.log("stop recording...");
		if (this.isRecording()) {
			this.recording = false;
			// close streams
			this.closeStreams();
		}
		this.emit("stop");
	}

	/**
	 * checks status code (200) and content type (audio/mpeg).
	 * if the response is valid, method pipes the response 
	 * into file writestream. this.timer is started.
	 * for listeners a "record" event is emitted.
	 * 
	 * In case of an invalid status code or content type, a HttpError is thrown.
	 */
	connectStreams(response) {
		console.log('radio GET response statusCode:', response.statusCode);
		console.log('radio GET response headers:', response.headers);

		const statusCode = response.statusCode;
		const contentType = response.headers["content-type"];

		let error;
		if (statusCode !== 200) {
			error = new HttpError(statusCode, contentType, "Request Failed.");
		} else if (!/^audio\/mpeg/.test(contentType)) {
			error = new HttpError(statusCode, contentType, "Invalid content-type, expected audio/mpeg.");
		}
		
		if (error) {
			console.error(error.message);
			// consume response data to free up memory
			response.resume();
			throw(error);
		} else {
			console.log("pipe radio stream to file...");

			this.recordFile = this.openWriteStream();	
			this.radioStation = response;

			this.radioStation.pipe(this.recordFile);	// readstream.pipe(writestream)

			this.timer.start();
			this.recording = true;
			this.emit("record");
		}
	}

	/**
	 * returns a writeStream
	 * TODO create subdirectory if necessary
	 * TODO is file already present? alter filename to filename-<number>
	 */
	openWriteStream() {
		console.log("opening file " + this.filename);
		let writeStream = new fs.WriteStream(this.filename);
		// register callback for error event
		writeStream.on("error", (e) => {
			console.error(e);
			throw(e);
		});
		
		return writeStream;
	}

	closeStreams() {
		console.log("closing streams...");		
		this.radioStation.unpipe(this.recordFile);
		this.recordFile.end();
	}
}

//export API
module.exports = StreamRecorder;
