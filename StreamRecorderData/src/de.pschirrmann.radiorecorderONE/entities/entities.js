"use strict";

class RadioShow {
	constructor(title, length) {
		// super(); // exception in mocha test
		this.title = title;
		this.length = length;
	}
}

class RadioStation {	
	constructor(name, url) {
		// super(); // exception in mocha test
		this.name = name;
		this.url = url;
		this.radioShows = new Set();	// creates a collection of unique items
	}
	
	/**
	 * returns the count of radio shows after adding the new show
	 */
	addRadioShow(newRadioShow) {
		this.radioShows.add(newRadioShow);
		return this.radioShows.size;
	}
	
	/**
	 * returns the count of radio shows after deleting the given show
	 */
	removeRadioShow(showToBeRemoved) {
		this.radioShows.delete(showToBeRemoved);
		return this.radioShows.size;
	}
	
}

//export API
module.exports = {
	RadioStation: RadioStation,
	RadioShow: RadioShow
};
