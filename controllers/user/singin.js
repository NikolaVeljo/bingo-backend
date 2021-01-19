const mongoose = require("mongoose");
const validator = require("validator");
const User = require("../../models/user");
const crypto = require("crypto");
const asyncHandler = require("../../services/asyncHandler");
const createCookie = require("../../services/createCookie");
const createAuthToken = require("../../services/createAuthToken");
const { ErrorHandler } = require("../../services/errorHandler");

module.exports = asyncHandler(async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    let user;

    if (!email) {
        throw new ErrorHandler(400, "Please enter a email or username");
    }

    if (!password) {
        throw new ErrorHandler(400, "Please enter a password");
    }

    if (!validator.isLength(password, {min: 8, max: 22})) {
        throw new ErrorHandler(400, "Your password must be between 8 and 22 characters");
    }

    if (validator.isEmail(email)) {
        user = await User.findOne({ email: validator.normalizeEmail(email) }).select("+password");
    } else if (validator.isAlphanumeric(email)) {
        user = await User.findOne({ username: email }).select("+password");
    } else {
        throw new ErrorHandler(400, "Please enter a valid username or email");
    }

    if (!(user && await user.comparePasswords(password, user.password))) {
        throw new ErrorHandler(401, "Incorrect login credentials");
    }

    const csrf = await crypto.randomBytes(36).toString("hex");
    const token = await createAuthToken(user._id, csrf);
    createCookie(res, token, "token");

    res.status(200).json({
        username: user.username,
        csrf: csrf,
    });

});
