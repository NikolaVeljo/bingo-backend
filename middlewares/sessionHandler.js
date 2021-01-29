const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../db/redis");

const RedisStore = connectRedis(session);

const sessionObject = {
	store: new RedisStore({
		client: redisClient,
	}),
	name: "session",
	secret: "4cf9b676033e152d51caeba321",
	saveUninitialized: false,
	resave: false,
	cookie: {
		rolling: true,
		secure: true,
		httpOnly: true,
		maxAge: 1000 * 60 * 30,
	},
};

const sessionHandler = session(sessionObject);

module.exports = sessionHandler;
