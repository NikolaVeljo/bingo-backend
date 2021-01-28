const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongooseClient = require("./db/mongo");

(async () => {
	try {
		mongooseClient();
		console.log("Connected to MongoDB");
		require("./app");
	} catch (e) {
        console.log(e);
	}
})();