const mongoose = require("mongoose");

class ErrorHandler extends Error {
	constructor(code, message) {
		super();
		this.code = code || 500;
		this.message = message || "error";
	}
}

const errorHandler = (err, res) => {
	let { code, message } = err;
	console.log(err);

	if (!code) {
		code = 500;
		message = "Something went wrong";
		console.log(err);
	}

	if (code === 11000) {
		code = 400;
		message = Object.keys(err.keyValue) + ": already exist";
	}

	if (err instanceof mongoose.Error.ValidationError) {
		code = 400;
	}
	console.log(code);
	res.status(code).json({
		status: "error",
		code,
		message,
	});
};

module.exports = {
	ErrorHandler,
	errorHandler,
};
