const assert = require("assert");
const RadioShow = require("../src/de.pschirrmann.radioRecorderONE").entities.RadioShow; 
const RadioStation = require("../src/de.pschirrmann.radioRecorderONE").entities.RadioStation; 

describe("RadioStation", () => {

	let station;
	let presentShow;
	
	beforeEach(() => {
		// runs before each test in this block
		station = new RadioStation("TestStation", "localhost");
		presentShow = new RadioShow("presentShow", 60);
		station.addRadioShow(presentShow);

	});

	afterEach(() => {
		// runs after each test in this block
		station = "undefined";
	});

	describe("#addRadioShow(newRadioShow)", () => {
		it("should return 2 when adding a new show", () => {
			const countOfShows = station.addRadioShow(new RadioShow("showTitle", 60));
			assert.equal(countOfShows, 2);
		});
	});
	
	describe("#removeRadioShow(showToBeRemoved)", () => {
		it("should return 0 when removing the present show", () => {
			const countOfShows = station.removeRadioShow(presentShow);
			assert.equal(countOfShows, 0);
		});
	});
	
	
});