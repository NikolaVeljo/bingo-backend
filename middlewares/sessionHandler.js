const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../db/redis");

const RedisStore = connectRedis(session);

const sessionObject = {
	store: new RedisStore({
		client: redisClient,
	}),
	name: "session",
	domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : "",
	secret: proccess.env.REDIS_SECRET,
	saveUninitialized: false,
	resave: false,
	rolling: true,
	cookie: {
		secure: process.env.NODE_ENV === "production" ? true : false,
		httpOnly: true,
		maxAge: 1000 * 60 * 30,
	},
};

const sessionHandler = session(sessionObject);

module.exports = sessionHandler;
