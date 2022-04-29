const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "deaf8f0d024471",
        pass: "23f337034f8735"
    }
});

module.exports = transporter;