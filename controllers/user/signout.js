const asyncHandler = require("../../services/asyncHandler");
module.exports = asyncHandler(async (req, res, next) => {
    await res.clearCookie("token", {
        domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : 'localhost',
        path: "/",
    });
    res.status(200).json({
        status: "success",
    });
});