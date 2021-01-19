const mongoose = require("mongoose");
const validator = require("validator");
const User = require("../../models/user");
const verifyAuthToken = require("../../services/verifyAuthToken");
const asyncHandler = require("../../services/asyncHandler");

module.exports = asyncHandler(async (req, res, next) => {

        const csrf = req.headers['x-csrf-token'];
        const token = await req.cookies["token"];

        if(!(csrf && validator.isAlphanumeric(csrf) && token && validator.isJWT(token))) {
            return res.status(200).json({
                authenticated: false,
                username: null,
            });
        }

        const decoded = await verifyAuthToken(token);

        if (!decoded) {
            return res.status(200).json({
                authenticated: false,
                username: null,
            });
        }

        const dateNow = Math.floor(Date.now() / 1000);
        const tokenExp = decoded.exp;

        if(tokenExp < dateNow) {
            return res.status(200).json({
                authenticated: false,
                username: null,
            });
        }

        const tokenCsrf = decoded.csrf;

        if(csrf !== tokenCsrf) {
            return res.status(200).json({
                authenticated: false,
                username: null,
            });
        }

        const userId = decoded.uid;

        if(!(userId && validator.isMongoId(userId))) {
            return res.status(200).json({
                authenticated: false,
                username: null,
            });
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(200).json({
                authenticated: false,
                username: null,
            });
        }

        res.status(200).json({
            authenticated: true,
            username: user.username,
        });
});
