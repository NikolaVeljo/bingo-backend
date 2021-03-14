const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authHandler");
const ticketController = require("../controllers/ticket");

router.post("/create-ticket", authHandler, ticketController.ticketCreate);
router.get("/get-tickets", authHandler, ticketController.getTickets);

module.exports = router;
