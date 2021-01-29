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
	secret:"47b4ec7e244a545d98663ff64fcdf949a760e6acf9b676033e152d51caeba320",
	saveUninitialized: false,
	resave: false,
	cookie: {
		domain: "https://bingo-frontend-iku9k.ondigitalocean.app",
		secure: true,
		httpOnly: true,
		maxAge: 1000 * 60 * 30,
	},
}

const sessionHandler = session(sessionObject);

module.exports = sessionHandler;
