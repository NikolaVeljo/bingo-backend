const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/asyncHandler");
const { ErrorHandler } = require("../middlewares/errorHandler");

const mongooseClient = asyncHandler(async () => {
	const mongoDatabse = await mongoose.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});

	if (!mongoDatabse) {
		throw new ErrorHandler(400, "Can't connect to mongo database");
	}
});

module.exports = mongooseClient;
