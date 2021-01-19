const asyncHandler = require("../services/asyncHandler");
const { ErrorHandler } = require("../services/errorHandler");
const verifyAuthToken = require("../services/verifyAuthToken");
const validator = require("validator");

module.exports = verifyUserAuth = asyncHandler(async (req, res, next) => {

    const csrf = req.body.csrf;
    console.log("csrf" + csrf);
    const token = await req.cookies["token"];
    console.log("token" + token);
    if(!(csrf && validator.isAlphanumeric(csrf) && token && validator.isJWT(token))) {
        console.log("1");
        throw new ErrorHandler(401, "Unauthorized");
    }

    const decoded = await verifyAuthToken(token);

    if (!(decoded && decoded.exp && decoded.csrf && decoded.uid)) {
        console.log("2");
        throw new ErrorHandler(401, "Unauthorized");
    }

    const date = Math.floor(Date.now() / 1000);

    if(decoded.exp < date) {
        console.log("3");
        throw new ErrorHandler(401, "Unauthorized");
    }

    if(csrf !== decoded.csrf) {
        console.log("4");
        throw new ErrorHandler(401, "Unauthorized");
    }

    if(!validator.isMongoId(decoded.uid)) {
        console.log("5");
        throw new ErrorHandler(401, "Unauthorized");
    }

    req.uid = decoded.uid;
    req.date = date;

    console.log(req.uid, req.date);
    next();
});