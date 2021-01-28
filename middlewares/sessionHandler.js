const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../db/redis");

const RedisStore = connectRedis(session);

const sessionHandler = session({
	store: new RedisStore({
		client: redisClient,
	}),
	name: "session",
	secret: "secret",
	saveUninitialized: false,
	resave: false,
	cookie: {
		secure: false,
		httpOnly: true,
		maxAge: 1000 * 60 * 30,
	},
});

module.exports = sessionHandler;
