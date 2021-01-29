const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../db/redis");

const RedisStore = connectRedis(session);

console.log( process.env.NODE_ENV )
const sessionObject = {
	store: new RedisStore({
		client: redisClient,
	}),
	name: "session",
	secret:process.env.REDIS_SECRET,
	saveUninitialized: false,
	resave: false,
	cookie: {
		domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : '',
		secure: true,
		httpOnly: true,
		maxAge: 1000 * 60 * 30,
	},
}

const sessionHandler = session(sessionObject);

module.exports = sessionHandler;
