const mongoose = require("mongoose");

class ErrorHandler extends Error {
    constructor(code, message) {
        super();
        this.code = code || 500;
        this.message = message || "error";
    }
}

const handleError = (err, res) => {
    console.log( err )
    let { code, message } = err;

    if (code === 11000) {
        code = 400;
        message = Object.keys(err.keyValue) + ": already exist";
    }

    if (err instanceof mongoose.Error.ValidationError) {
        code = 400;
    }

    res.status(code).json({
        status: "error",
        code,
        message
    });
};

module.exports = {
    ErrorHandler,
    handleError
}