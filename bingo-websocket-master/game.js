const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    status: {
        type: String,
        enum: ["active", "finished", "open"]
    },
    numbers: [{
        type: Number,
        min: 1,
        max: 48,
    }],
    list: [{
        type: Number,
        min: 1,
        max: 48,
    }],
    luckyNumbers: [{
        type: Number,
        min: 1,
        max: 48,
    }],
    luckyNumbersPosition: [{
        type: Number,
        min: 0,
        max: 47,
    }]
}, {
    toJSON: {
        virtuals: true,
    },
});

gameSchema.path('numbers').validate((value) => {
    if (value.length > 35) {
        throw new Error("Maximum is 35");
    }
});

gameSchema.path('list').validate((value) => {
    if (value.length > 48) {
        throw new Error("Maximum is 13");
    }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
