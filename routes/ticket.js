const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authHandler");
const ticketController = require("../controllers/ticket");

//authHandler must be setted up as security layer
router.post("/create-ticket" , ticketController.ticketCreate);
router.get("/get-tickets", authHandler, ticketController.getTickets);
router.get("/get-winning-tickets", ticketController.getWinningTickets);
router.get("/get-losed-tickets", ticketController.getLosedTickets);

module.exports = router;
