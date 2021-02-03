const crypto = require("crypto");
const validator = require("validator");
const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/asyncHandler");
const { ErrorHandler } = require("../middlewares/errorHandler");
const User = require("../models/user");
const sendEmail = require('../services/emailHandler');

const signIn = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ErrorHandler(400, "Please fill in all fields");
	}

	if (!validator.isEmail(email)) {
		throw new ErrorHandler(400, "Please enter valid email");
	}
	const user = await User.findOne({
		email: validator.normalizeEmail(email),
	}).select("+password");

	if (!(user && (await user.comparePasswords(password, user.password)))) {
		throw new ErrorHandler(401, "Incorrect login credentials");
	}

	const csrf = crypto.randomBytes(36).toString("hex");

	req.session.uid = user._id;
	req.session.username = user.username;
	req.session.csrf = csrf;
	req.session.confirmed = user.confirmed;
	req.session.role = user.role;

	res.status(200).json({
		username: user.username,
		csrf: csrf,
		confirmed: user.confirmed,
		role: user.role,
	});
});

const signUp = asyncHandler(async (req, res) => {
	const { username, email, password, passwordConfirm } = req.body;
	console.log(req.body);
	console.log(username, email, password, passwordConfirm);

	if (!username || !email || !password || !passwordConfirm) {
		throw new ErrorHandler(400, "Please fill in all fields");
	}

	if (!validator.isLength(password, { min: 8, max: 22 })) {
		throw new ErrorHandler(
			400,
			"Your password must be between 8 and 22 characters"
		);
	}

	if (password !== passwordConfirm) {
		throw new ErrorHandler(400, "Passwords are not the same");
	}

	if (!validator.isAlphanumeric(username)) {
		throw new ErrorHandler(400, "You must provide a valid username");
	}

	if (!validator.isLength(username, { min: 4, max: 22 })) {
		throw new ErrorHandler(
			400,
			"Your username must be between 4 and 22 characters"
		);
	}

	if (!validator.isEmail(email)) {
		throw new ErrorHandler(400, "You must provide a valid email");
	}

	const user = await User.create({
		username: username,
		email: validator.normalizeEmail(email),
		password: password,
		passwordConfirm: passwordConfirm,
	});

	const csrf = crypto.randomBytes(36).toString("hex");
	const emailToken = crypto.randomBytes(36).toString("hex");

	const text = `https://bingo-frontend-iku9k.ondigitalocean.app/confirm-email/${emailToken}`;
    const html = `<a href="https://bingo-frontend-iku9k.ondigitalocean.app/confirm-email/${emailToken}">Confirm email</a>`;

    await sendEmail({
        email: user.email,
        subject: "Please confirm your email",
        text,
        html,
    });

	console.log(user.confirmed)
	res.status(201).json({
		username: user.username,
		csrf: csrf,
		confirmed: user.confirmed,
		role: user.role,
	});
});

const signOut = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(400).json("Logout error");
		} else {
			req.session = null;
			res.clearCookie("session", {
				path: "/",
			});
			res.status(200).json("Logged out!");
		}
	});
};

const getUser = asyncHandler(async (req, res) => {
	res.status(200).json({
		username: req.session.username,
		csrf: req.session.csrf,
		confirmed: req.session.confirmed,
		role: req.session.role,
	});
});

module.exports = {
	signIn,
	signOut,
	signUp,
	getUser,
};
