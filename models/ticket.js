const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    selectedNumbers : [{
        type: Number,
        required: true,
        length: 6
    }],
    stake: {
        type: Number,
        required: true,
        min:10,
        max: 1000,
    },
    game:{
        type: Schema.ObjectId,
        ref: 'Game'
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    }
},{
    toJSON: {
        virtuals: true,
    },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;