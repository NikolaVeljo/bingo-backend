const asyncHandler = require("../middlewares/asyncHandler");
const { ErrorHandler } = require("../middlewares/errorHandler");
const Ticket = require("../models/ticket");
const User = require("../models/user");
const Game = require("../models/game");
const { performance, PerformanceObserver } = require('perf_hooks');
  

const ticketCreate = asyncHandler(async (req, res) => {
	const { ticketNumbers, stake } = req.body;
	const uid = req.session.uid;

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

	await ticket.save();

	const user = await User.findOne({ _id: uid });

	if (!user) {
		throw new ErrorHandler("Game is closed!");
	}

	await user.tickets.push(ticket);
	await user.save();
	await game.tickets.push(ticket);
	await game.save();

	res.status(200).json("Ticket succesufully created");
});

const getTickets = asyncHandler(async (req, res) => {
	const uid = req.session.uid;

    const ticket = await Ticket.find({user : uid }).limit(10);

	res.status(200).json(ticket);
});

module.exports = {
	ticketCreate,
	getTickets,
};
