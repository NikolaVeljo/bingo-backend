const asyncHandler = require("../middlewares/asyncHandler");
const { ErrorHandler } = require("../middlewares/errorHandler");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const Game = require("../models/game");
const { performance, PerformanceObserver } = require('perf_hooks');

const values = [
	0,
	0,
	0,
	0,
	0,
	25000,
	15000,
	7500,
	3000,
	1250,
	700,
	350,
	250,
	175,
	125,
	100,
	90,
	80,
	70,
	60,
	50,
	35,
	25,
	20,
	15,
	12,
	10,
	8,
	7,
	6,
	5,
	4,
	3,
	2,
	1,
];

const ticketCreate = asyncHandler(async (req, res) => {
	const { ticketNumbers, stake } = req.body;
	const uid = req.session.uid;
	
	if ( !uid ){
		return res.status(401).json("Invalid User ID!");
	}

	const game = await Game.findOne({ status: "open" });

	if (!game) {
		throw new ErrorHandler("Game is closed!");
	}

	const ticket = await Ticket.create({
		selectedNumbers: ticketNumbers,
		stake: stake,
		game: game._id,
		user: uid,
	});

	console.log(ticket);
	await ticket.save();

	const user = await User.findById({ _id: uid });

	if (!user) {
		throw new ErrorHandler("Game is closed!");
	}
	
	await user.tickets.push(ticket);
	user.balance = user.balance - stake;
	await user.save();
	await game.tickets.push(ticket);
	await game.save();


	res.status(200).json("Ticket succesufully created");
});


const getPendingTickets = async () => {
	return await Ticket.find({status: 'pending'});
}

const getWinningTickets = async () => {
	return await Ticket.find({status: 'winning'});
}

const getLosedTicets = async () => {
	return await Ticket.find({status: 'losed'});
}


const getGamesForPendingTickets = async ( gameId ) => {
	const game = await Game.find({_id : gameId});
	[numbers] = game;

	return numbers;
}

const checker = (arr, target) => {
	let newArray = [];

	target.every((v) => {
		console.log(v);
		if(arr.indexOf(v) === -1){	
			return [];
		} else {
			return newArray.push(arr.indexOf(v));
		}
	});

	return newArray;
};

const getUserById = async (userId) => {
	return await User.findById({_id: userId});
}

const calculateSingleTicket = async (singleTicket) => {

	const {user, game, selectedNumbers, stake, _id} = singleTicket;

	const ticketUser = await getUserById(user);
	const ticketGame = await getGamesForPendingTickets(game);

	const {status, numbers, luckyNumbersPosition} = ticketGame;

	if ( status === 'finished') {
		const winningNumbersPosition = checker(numbers, selectedNumbers);

		if ( winningNumbersPosition.length === 6 ){

			const baseAmount = values[ Math.max(...winningNumbersPosition) ];
			const doesWiningNumbersHaveClover = checker(winningNumbersPosition,luckyNumbersPosition).length * 2;
			const nonZeroClover = doesWiningNumbersHaveClover === 0 ? 1 : doesWiningNumbersHaveClover;
			const totalBalance = stake * nonZeroClover * baseAmount;

			ticketUser.balance += totalBalance;
			ticketUser.save();

			await Ticket.findByIdAndUpdate({_id: _id}, {status: 'winning'});
		} else {
			await Ticket.findByIdAndUpdate({_id: _id}, {status: 'losed'});
		}
	}
	
}

const getTickets = asyncHandler(async (req, res) => {

	let pendingTickets = await getPendingTickets();
	
	let start = performance.now();
	for ( let pendingTicket of pendingTickets ){

		await calculateSingleTicket(pendingTicket);
	}

	let end = performance.now();
	console.log(end - start);

	res.status(200).json(pendingTickets);
});

module.exports = {
	ticketCreate,
	getTickets,
	getWinningTickets,
	getLosedTicets
};
