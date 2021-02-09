const crypto = require("crypto");
const validator = require("validator");
const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/asyncHandler");
const { ErrorHandler } = require("../middlewares/errorHandler");
const User = require("../models/user");
const sendEmail = require("../services/emailHandler");

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

	if (!user.confirmed) {
		throw new ErrorHandler(403, "Please confirm your email");
	}

	const csrf = crypto.randomBytes(36).toString("hex");

	req.session.uid = user._id;
	req.session.username = user.username;
	req.session.csrf = csrf;
	req.session.role = user.role;

	res.status(200).json({
		authenticated: true,
		username: user.username,
		csrf: csrf,
		role: user.role,
	});
});

const signUp = asyncHandler(async (req, res) => {
	const { username, email, password, passwordConfirm } = req.body;
	
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
	});

	const emailToken = await user.createEmailToken();
	await user.save({ validateBeforeSave: false });
	let text;
	let html;

	if (process.env.NODE_ENV === "production") {
		text = `https://bingo-frontend-iku9k.ondigitalocean.app/confirm-email/${emailToken}`;
		html = `<a href="https://bingo-frontend-iku9k.ondigitalocean.app/confirm-email/${emailToken}">Confirm email</a>`;
	} else {
		text = `http://localhost:3000/confirm-email/${emailToken}`;
		html = `<a href="http://localhost:3000/confirm-email/${emailToken}">Confirm email</a>`;
	}

	await sendEmail({
		email: user.email,
		subject: "Please confirm your email",
		text,
		html,
	});

	res.redirect(301,'/sign-in');
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
		authenticated: true,
		username: req.session.username,
		csrf: req.session.csrf,
		confirmed: req.session.confirmed,
		role: req.session.role,
	});
});

const emailConfirm = asyncHandler(async (req, res) => {
	const { emailToken } = req.body;

	if (!emailToken) {
		throw new ErrorHandler(400, "You must provide a token");
	}

	if (!validator.isHash(emailToken, "sha256")) {
		throw new ErrorHandler(400, "You must provide a token");
	}

	const user = await User.findOne({
		emailConfirmToken: emailToken,
		emailConfirmExpires: { $gt: Date.now() },
	});

	if (!user) {
		throw new ErrorHandler(400, "The token has expired");
	}

	user.confirmed = true;
	user.emailConfirmToken = undefined;
	user.emailConfirmExpires = undefined;

	await user.save();
	res.status(200).json("You have successfully confirmed the email");
});

const resendEmailToken = asyncHandler(async (req, res) => {
	const { email } = req.body;

	if (!email) {
		throw new ErrorHandler(400, "Email is missing!");
	}

	if (!validator.isAlphanumeric(email)) {
		throw new ErrorHandler(400, "You must provide a valid email!");
	}

	const user = await User.findOne({
		email: email,
		confirmed: false,
	});

	if (user) {
		const emailToken = crypto.randomBytes(36).toString("hex");

		let text;
		let html;

		if (process.env.NODE_ENV === "production") {
			text = `https://bingo-frontend-iku9k.ondigitalocean.app/confirm-email/${emailToken}`;
			html = `<a href="https://bingo-frontend-iku9k.ondigitalocean.app/confirm-email/${emailToken}">Confirm email</a>`;
		} else {
			text = `http://localhost:3000/confirm-email/${emailToken}`;
			html = `<a href="http://localhost:3000/confirm-email/${emailToken}">Confirm email</a>`;
		}

		await sendEmail({
			email: user.email,
			subject: "Please confirm your email",
			text,
			html,
		});

		req.session.uid = user._id;
		req.session.emailToken = emailToken;
		return res.status(200).json("New email has been sent!");
	}

	res.status(200).json("You have allready confirmed you email");
});

module.exports = {
	signIn,
	signOut,
	signUp,
	emailConfirm,
	getUser,
	resendEmailToken,
};
