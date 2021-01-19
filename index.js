const fs = require("fs");
const http = require("http");
const WebSocket = require('ws');
// const https = require("https");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
// const privateKey = fs.readFileSync("./ssl/private.key", "utf8");
// const certificate = fs.readFileSync("./ssl/certificate.crt", "utf8");
// const credentials = { key: privateKey, cert: certificate };
// const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

const wss = new WebSocket.Server({
    port: 8081,
});

let randomNumbersArr = [];
let gameInterval;
let pauseInterval;
let pauseSeconds;

const roundInterval = () => {
    // Kreiramo next round i podesavamo variablu nextRound sa id-jem koji smo kreirali
    //
    randomNumbersArr = [];

    console.log("roundInterval started");
    gameInterval = setInterval(getRandomNumber, 10000)
}

//
const gamePauseHandler = () => {

    if ( pauseSeconds > 0 ){
        console.log(pauseSeconds);
        pauseSeconds -= 1;
    } else {
        console.log("pauseInterval clearde");
        clearInterval(pauseInterval);
        console.log( 'roundInterval started from pause handler ');
        roundInterval();
    }
}

const getRandomNumber = () => {
    console.log( 'inside random number function')

    if (randomNumbersArr.length < 6) {

        let randomNumber = Math.floor(Math.random() * 80 ) + 1;

        if ( randomNumbersArr.indexOf( randomNumber ) === -1 ) {

            randomNumbersArr.push( randomNumber );
            console.log( randomNumbersArr )
        } else {
            console.log(" inside random number else")
            getRandomNumber();

        }
    } else {
        console.log('clearInterval');
        pauseSeconds = 20;

        // Stavljamo next round da bude current round
        //
        clearInterval(gameInterval);
        pauseInterval = setInterval(gamePauseHandler,1000);
    }
}

wss.on('connection', function connection(ws) {

    setInterval(function(){
        ws.send(JSON.stringify({
            pause: pauseSeconds,
            numbers: randomNumbersArr
        }));
    }, 1000);

});


(async() => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        httpServer.listen(8080);
        console.log("Server started");
        roundInterval();
    } catch (e) {
        console.log(e)
    }
})();

