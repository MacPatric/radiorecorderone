"use strict";

/**
 * cmdline facade for the StreamRecorder class
 */

const program = require("commander");
const StreamRecorder = require("./de.pschirrmann.radioRecorderONE").streamrecorder; 

//streamrecord --duration 60 --filename dradio.mp3 http://stream.dradio.de/7/249/142684/v1/gnl.akacast.akamaistream.net/dradio_mp3_dlf_m

program
	.version("0.2.1");

program
	.arguments("<streamUrl>")
	.option("-D, --duration <n>", "The duration of the recording in minutes", parseFloat)
	.option("-F, --file <file>", "The filename to save the stream to");	// <> required, [] optional argument

program
	.action(function(streamUrl) {
		if (streamUrl === "undefined" || 
				program.duration === "undefined" ||
				program.file === "undefined") {
			program.outputHelp();
			process.exit(1);
		}
		const recorder = new StreamRecorder(streamUrl, program.duration, program.file);	
		recorder.record();
	});

//must be before .parse() since
//node's emit() is immediate
program.on("--help", function() {
	console.log("  Example:");
	console.log("");
	console.log("    streamrecord --duration 60 --file test.mp3 http://mp3.querfunk.de/qfhi");
	console.log("");
});

program.parse(process.argv);

if (!process.argv.slice(6).length) {
	program.outputHelp();
}