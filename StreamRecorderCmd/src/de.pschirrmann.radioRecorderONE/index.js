/**
 * entry point is minimal in nature, just ties together the parts needed to provide the API
 */

module.exports = {
	eggtimer: require("./eggtimer"),
	streamrecorder: require("./streamrecorder"),
	exceptions: require("./exceptions")
}; 

