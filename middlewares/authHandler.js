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
		throw new ErrorHandler(401, "Unauthorized");
	}
	next();
});

module.exports = authHandler;
