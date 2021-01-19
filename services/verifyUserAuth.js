const asyncHandler = require("../services/asyncHandler");
const { ErrorHandler } = require("../services/errorHandler");
const verifyAuthToken = require("../services/verifyAuthToken");
const validator = require("validator");

module.exports = verifyUserAuth = asyncHandler(async (req, res, next) => {

    const csrf = req.headers['x-csrf-token'];
    const token = req.cookies["token"];

    if(!(csrf && validator.isAlphanumeric(csrf) && token && validator.isJWT(token))) {
        throw new ErrorHandler(401, "Unauthorized");
    }

    const decoded = await verifyAuthToken(token);

    if (!(decoded && decoded.exp && decoded.csrf && decoded.uid)) {
        throw new ErrorHandler(401, "Unauthorized");
    }

    const date = Math.floor(Date.now() / 1000);

    if(decoded.exp < date) {
        throw new ErrorHandler(401, "Unauthorized");
    }

    if(csrf !== decoded.csrf) {
        throw new ErrorHandler(401, "Unauthorized");
    }

    if(!validator.isMongoId(decoded.uid)) {
        throw new ErrorHandler(401, "Unauthorized");
    }

    const mongoDate = Date.now();

    req.uid = decoded.uid;
    req.date = mongoDate;
    next();
});
