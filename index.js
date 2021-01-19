const fs = require("fs");
const http = require("http");
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

console.log( process.env.DATABASE );

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
