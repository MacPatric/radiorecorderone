"use strict";

class HttpError extends Error {
	constructor(statusCode, contentType, message) {
		super(arguments);
		this.statusCode = statusCode;
		this.contentType = contentType;
		this.message = message + " " + "statusCode " + statusCode + ", contentType " + contentType;
	}
}

//export API
module.exports = {
	HttpError: HttpError
};
