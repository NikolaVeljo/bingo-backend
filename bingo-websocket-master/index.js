const mongoose = require("mongoose");
const WebSocket = require("ws");
const dotenv = require("dotenv");
dotenv.config({path: "./../config.env"});
const Game = require("./game");

const defaultList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];

let nextGame;
let currentGame = {
	_id: null,
	numbers: [],
	list: [],
	luckyNumbers: [],
	luckyNumbersPosition: []
};
let gameInterval;
let pauseInterval;
let gamePause;

const createGame = async () => {
	try {
		const game = new Game({
			status: "open",
			numbers: [],
			list: [...defaultList],
			luckyNumbers: [],
			luckyNumbersPosition: []
		});
		await game.save();
		return game;
	} catch (e) {
		console.log(e);
	}
}

const updateGame = async (id, numbers, list, luckyNumbers) => {
	try {
		return Game.findOneAndUpdate({_id: id}, {
				numbers: numbers,
				list: list,
				luckyNumbers: luckyNumbers
			}, {upsert: true, new: true}
		);
	} catch (e) {
		console.log(e);
	}
}

const updateCurrentStatus = async (id, status) => {
	try {
		return await Game.findOneAndUpdate({_id: id}, {
				status: status,
			}, {upsert: true, new: true}
		);
	} catch (e) {
		console.log(e);
	}
}

const updateCurrentGame = async (id, status, luckyNumbers, luckyNumbersPosition) => {
	try {
		return await Game.findOneAndUpdate({_id: id}, {
				status: status,
				luckyNumbers: luckyNumbers,
				luckyNumbersPosition: luckyNumbersPosition
			}, {upsert: true, new: true}
		);
	} catch (e) {
		console.log(e);
	}
}

const findActiveGame = async () => {
	try {
		return await Game.findOne({status: "active"});
	} catch (e) {
		console.log(e);
	}
}

const findOpenGame = async (id, status) => {
	try {
		return await Game.findOne({status: "open"});
	} catch (e) {
		console.log(e);
	}
}

const wss = new WebSocket.Server({
	port: 8081,
});

const createLuckyNumbersPosition = () => {
	let array = [];
	while (array.length < 3) {
		let random = Math.floor(Math.random() * 29 + 6);
		if (!array.includes(random)) {
			array.push(random);
		}
	}
	return array;
}

const number = async () => {
	try {
		if (currentGame && currentGame._id !== null && currentGame.numbers.length < 35) {
			let index = Math.floor(Math.random() * currentGame.list.length);
			currentGame.numbers.push(currentGame.list[index]);
			currentGame.list.splice(index, 1);
			if (currentGame.luckyNumbersPosition.includes(currentGame.numbers.length)) {
				currentGame.luckyNumbers.push(currentGame.numbers[currentGame.numbers.length-1]);
			}
			await updateGame(currentGame._id, currentGame.numbers, currentGame.list, currentGame.luckyNumbers);
		} else {
			clearInterval(gameInterval);
			if (currentGame && currentGame._id !== null) {
				currentGame = await updateCurrentStatus(currentGame._id, "finished");
			}
			currentGame = nextGame;
			gamePause = 120;
			pauseInterval = setInterval(pause, 1000);
		}
	} catch (e) {
		console.log(e);
	}
}

const pause = () => {
	if (gamePause > 0) {
		gamePause -= 1;
	} else {
		clearInterval(pauseInterval);
		game().then(() => {
			console.log("Game started");
		});
	}
}

const game = async () => {
	try {
		if (!nextGame) {
			const openGame = await findOpenGame();
			if (openGame) {
				nextGame = openGame;
			} else {
				nextGame = await createGame();
			}
		} else {
			nextGame = await createGame();
		}
		if (currentGame && currentGame._id) {
			const luckyNumbersPosition = createLuckyNumbersPosition();
			console.log(luckyNumbersPosition);
			currentGame = await updateCurrentGame(currentGame._id, "active", [], luckyNumbersPosition);
		} else {
			const activeGame = await findActiveGame();
			if (activeGame) {
				console.log(activeGame);
				currentGame = activeGame;
				if(!currentGame.luckyNumbers) {
					console.log("bu");
					currentGame.luckyNumbers = [];
				}
			}
		}
		gameInterval = setInterval(number, 4000);
	} catch (e) {
		console.log(e);
	}
}

(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log("connected to mongo")
		game().then(() => {
			wss.on('connection', function connection(ws) {
				const messageInterval = setInterval(() => {
					ws.send(JSON.stringify({
						id: currentGame._id,
						numbers: currentGame.numbers,
						list: currentGame.list,
						luckyNumbers: currentGame.luckyNumbers,
						luckyNumbersPosition: currentGame.luckyNumbersPosition
					}));
				}, 4000);
				ws.on("close", () => {
					clearInterval(messageInterval);
				});
			});
		});
	} catch (e) {
		console.log('zzz');
		console.log(e);
	}
})();
