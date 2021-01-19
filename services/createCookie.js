module.exports = createCookie = (res, token, name) => {
    const cookieOption = {
        domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : "",
        path: "/",
        maxAge: parseInt(process.env.COOKIE_EXP, 10),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };
    return res.cookie(name, token, cookieOption);
};
