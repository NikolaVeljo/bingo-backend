const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const { handleError } = require("./services/errorHandler");


const app = express();


app.use(cookieParser());

app.use(
    cors({
        origin: [
            process.env.WEBSITE,
            "http://localhost:3000",
            "localhost",
        ],
        credentials: true,
    })
);

app.use(express.json());

app.use("/", userRouter);

app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;
