const express = require("express");
const userRouter = require("./routes/user");
const ticketRouter = require("./routes/ticket");
const sessionHandler = require("./middlewares/sessionHandler");
const { errorHandler } = require("./middlewares/errorHandler");
const cors = require("cors");
const path = require("path");

const app = express();

if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
}

app.use(
	cors({
		origin: [
			process.env.NODE_ENV === "production"
				? process.env.WEBSITE
				: "http://localhost:3000",
		],
		credentials: true,
	})
);

app.use(express.json());
app.use(sessionHandler);

app.use("/api", userRouter);
app.use("/api", ticketRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get('*', (req,res) => {
	    res.sendFile(path.resolve(__dirname, "client", "build", "index.html") );
	});
}

app.use((err, req, res, next) => {
	errorHandler(err, res);
});

app.listen(5000, () => console.log("Server is running"));

module.exports = app;
