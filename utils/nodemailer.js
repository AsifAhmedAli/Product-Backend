const nodemailer = require('nodemailer');

const emailVerifier = (user, token, req) => {
    const transporter = nodemailer.createTransport({
        service: 'Sendgrid',
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    });

    const mailOptions = {
        from: 'no-reply@example.com',
        to: user.email,
        subject: 'Account Verification Link',
        text: 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n'
    }

    transporter.sendMail(mailOptions, function (err) {
        if (err) {
            return 'Technical Issue!, Please click on resend for verify your Email.';
        }
        return 'A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.';
    });

    return { transporter, mailOptions };
};

module.exports = emailVerifier;