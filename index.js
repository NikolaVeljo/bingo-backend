const fs = require("fs");
const http = require("http");
const webSocket = require('ws');
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

const ws = new WebSocket.Server({ httpServer });

ws.on('message', (message) => {

    //log the received message and send it back to the client
    console.log('received: %s', message);

    const broadcastRegex = /^broadcast\:/;

    if (broadcastRegex.test(message)) {
        message = message.replace(broadcastRegex, '');

        //send back the message to the other clients
        ws.clients
            .forEach(client => {
                if (client !== ws) {
                    client.send(`Hello, broadcast message -> ${message}`);
                }
            });

    } else {
        ws.send(`Hello, you sent -> ${message}`);
    }
});

const mongooseConnect = async() => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.log(e)
    }
}

mongooseConnect().then(() => {
    httpServer.listen(8080);
    console.log("Server started")
});
