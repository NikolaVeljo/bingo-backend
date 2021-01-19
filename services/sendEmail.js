const asyncHandler = require("../services/asyncHandler");
const nodemailer = require("nodemailer");

module.exports = sendEmail = asyncHandler(async (options) => {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: "Nenad Prodovic <nenadzero@gmail.com>",
            to: options.email,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };
        await transporter.sendMail(mailOptions);
});