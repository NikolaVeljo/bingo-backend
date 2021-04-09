const session = require("express-session");
var MongoDBStore = require('connect-mongodb-session')(session);

const sessionObject = {
	store : new MongoDBStore({
		uri: process.env.MONGO_URL,
		databaseName: 'database',
		collection: 'sessions'
	}),
	name: "session",
	secret:process.env.MONGO_SECRET,
	saveUninitialized: false,
	resave: false,
	rolling: true,
	cookie: {
		domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : 'localhost',
		secure: process.env.NODE_ENV === "production" ? true : false,
		httpOnly: true,
		maxAge: 1000 * 60 * 30,
	},
}

const sessionHandler = session(sessionObject);

module.exports = sessionHandler;
