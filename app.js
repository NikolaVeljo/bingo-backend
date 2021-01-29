const express = require("express");
const userRouter = require("./routes/user");
const sessionHandler = require("./middlewares/sessionHandler");
const { errorHandler } = require("./middlewares/errorHandler");
const cors = require('cors');

const app = express();

// if you run behind a proxy ( e.g. kubernates, ngix)
// app.set('trust proxy', 1)
app.use(
    cors()
);
app.use(express.json());
app.use(sessionHandler);

app.use("/", userRouter);

app.use((err, req, res) => {
	errorHandler(err, res);
});

app.listen(8080, () => console.log("Server is running"));

module.exports = app;
