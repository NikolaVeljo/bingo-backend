const jwt = require("jsonwebtoken");

module.exports = createAuthToken = (uid, csrf) => {
    return new Promise((resolve, reject) => {
        const dateNow = Math.floor(Date.now() / 1000);
        const payload = {
            uid: uid,
            csrf: csrf,
            iat: dateNow,
            exp: dateNow + parseInt(process.env.JWT_AUTH_EXP, 10),
        }
        jwt.sign(payload, process.env.JWT_AUTH_SECRET_KEY, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};