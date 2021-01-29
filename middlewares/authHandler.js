const validator = require("validator");
const asyncHandler = require("./asyncHandler");
const { ErrorHandler } = require("./errorHandler");

const authHandler = asyncHandler(async (req, res, next) => {
	const csrf = req.headers["x-csrf-token"];
	if (
		!(
			req.session &&
			req.session.uid &&
			req.session.csrf &&
			csrf &&
			req.session.csrf === csrf
		)
	) {
		console.log('unauthorizedddddd')
		throw new ErrorHandler(401, "Unauthorized");
	}

	//req.session.touch();

	next();
});

module.exports = authHandler;
