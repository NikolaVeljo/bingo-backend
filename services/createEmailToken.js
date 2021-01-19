const jwt = require("jsonwebtoken");

module.exports = createEmailToken = (uid) => {
    return new Promise((resolve, reject) => {
        const dateNow = Math.floor(Date.now() / 1000);
        const payload = {
            uid: uid,
            iat: dateNow,
            exp: dateNow + parseInt(process.env.JWT_EMAIL_EXP, 10),
        }
        jwt.sign(payload, process.env.JWT_EMAIL_SECRET_KEY, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};
