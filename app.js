const express = require("express");
const userRouter = require("./routes/user");
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

if (process.env.NODE_ENV === "production") {
    
    app.use(express.static(__dirname));
    
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build'));
    });

	// app.use(express.static("client/build"));
	// app.get('*', (req,res) => {
	//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html") );
	// });
}

app.use((err, req, res, next) => {
	errorHandler(err, res);
});

app.listen(5000, () => console.log("Server is running"));

module.exports = app;
