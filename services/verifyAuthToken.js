const jwt = require("jsonwebtoken");

module.exports = verifyAuthToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_AUTH_SECRET_KEY, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};